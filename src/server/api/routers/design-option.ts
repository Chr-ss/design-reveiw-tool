import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { mapPublicProductsToDesignOptions } from "@/server/api/utils/import-design-option";
import { db } from "@/server/db";

const designOptionInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url().nullable().optional(),
  area: z.number().positive(),
  cost: z.number().int().nonnegative(),
  embodiedCarbon: z.number().nonnegative(),
  daylightScore: z.number().min(0).max(1),
  tags: z.string().default(""),
  notes: z.string().nullable().optional(),
});

const importDesignOptionsInput = z.object({
  sourceUrl: z.string().url()
});

export const designOptionRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return db.designOption.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  byId: publicProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
    const option = await db.designOption.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!option) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Design option not found.",
      });
    }

    return option;
  }),

  byIds: publicProcedure
    .input(z.object({ ids: z.tuple([z.string().min(1), z.string().min(1)]) }))
    .query(async ({ input }) => {
      const options = await db.designOption.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      const optionsById = new Map(options.map((option) => [option.id, option]));
      const ordered = input.ids.map((id) => optionsById.get(id)).filter((option) => option !== undefined);

      if (ordered.length !== 2) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more design options were not found.",
        });
      }

      return ordered;
    }),

  create: publicProcedure.input(designOptionInput).mutation(async ({ input }) => {
    return db.designOption.create({
      data: {
        ...input,
        imageUrl: input.imageUrl ?? null,
        notes: input.notes ?? null,
      },
    });
  }),

  import: publicProcedure.input(importDesignOptionsInput).mutation(async ({ input }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8_000);

    let response: Response;

    try {
      response = await fetch(input.sourceUrl, {
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });
    } catch {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Unable to reach the public endpoint.",
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Public endpoint request failed with status ${response.status}.`,
      });
    }

    let payload: unknown;

    try {
      payload = (await response.json()) as unknown;
    } catch {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Public endpoint did not return valid JSON.",
      });
    }

    const mapped = mapPublicProductsToDesignOptions(payload);

    if (mapped.errors.length > 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: mapped.errors[0],
      });
    }

    const validated = mapped.data.map((item) =>
      designOptionInput.parse({
        ...item,
        imageUrl: item.imageUrl ?? null,
        notes: item.notes ?? null,
      }),
    );

    await db.designOption.createMany({
      data: validated.map((item) => ({
        ...item,
        imageUrl: item.imageUrl ?? null,
        notes: item.notes ?? null,
      })),
    });

    return {
      importedCount: validated.length,
      sourceUrl: input.sourceUrl,
    };
  }),
});
