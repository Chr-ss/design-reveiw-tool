import { db } from "../src/server/db";
import { z } from "zod";

const seedDesignOptionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url().nullable(),
  area: z.number().positive(),
  cost: z.number().int().nonnegative(),
  embodiedCarbon: z.number().nonnegative(),
  daylightScore: z.number().min(0).max(1),
  tags: z.string(),
  notes: z.string().nullable(),
});

async function main() {
  const count = await db.designOption.count();

  if (count > 0) {
    return;
  }

  const seedData = seedDesignOptionSchema.array().parse([
      {
        name: "The Purple Hall",
        description: "An intimate, single-balcony performance space defined by deep purple acoustic paneling and integrated vertical lighting strips.",
        imageUrl: "https://images.divisare.com/images/c_limit,f_auto,h_2000,q_auto,w_3000/v1/project_images/4745146/%C2%A9Peter-Guenzel_SPIJKENISSE_07/unstudio-theatre-de-stoep.jpg",
        area: 450,
        cost: 2100000,
        embodiedCarbon: 340,
        daylightScore: 0.05,
        tags: "intimate,acoustic-panels,purple,drama",
        notes: "Features a more traditional layout with textured wall treatments for sound diffusion.",
      },
      {
        name: "The Red Hall",
        description: "A monumental performance space featuring kaleidoscopic, faceted red paneling that wraps the entire volume including walls and ceiling.",
        imageUrl: "https://images.divisare.com/images/c_limit,f_auto,h_2000,q_auto,w_3000/v1/project_images/510865/1250414718/unstudio-christian-richters-iwan-baan-theater-agora.jpg",
        area: 1100,
        cost: 5400000,
        embodiedCarbon: 780,
        daylightScore: 0,
        tags: "kaleidoscopic,immersive,red,iconic",
        notes: "The faceted geometry is designed to scatter sound waves uniformly while creating a high-impact visual experience.",
      },
      {
        name: "Agora Theatre",
        description: "A faceted, vibrant theater scheme featuring a large main auditorium with a horseshoe seating arrangement and a deep stage.",
        imageUrl: "https://images.divisare.com/images/c_limit,f_auto,h_2000,q_auto,w_3000/v1/project_images/510777/1080068683/unstudio-christian-richters-iwan-baan-theater-agora.jpg",
        area: 2850,
        cost: 15400000,
        embodiedCarbon: 1150,
        daylightScore: 0.62,
        tags: "auditorium,faceted,performance,iconic",
        notes: "The large hall is optimized for acoustics and sightlines, utilizing a wrap-around balcony system.",
      },
      {
        name: "Vertical Foyer",
        description: "A central, sculptural circulation spine that connects various levels and functions through an expressive void.",
        imageUrl: "https://images.divisare.com/images/c_limit,f_auto,h_2000,q_auto,w_3000/v1/project_images/4745171/SPIJK_morphogenesis-step3/unstudio-theatre-de-stoep.jpg",
        area: 1420,
        cost: 6200000,
        embodiedCarbon: 980,
        daylightScore: 0.89,
        tags: "atrium,circulation,kaleidoscopic,foyer",
        notes: "High daylighting achieved through the faceted skylight system and glass facade; acts as a social hub.",
      },
    ]);

  await db.designOption.createMany({
    data: seedData,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
