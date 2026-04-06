import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950",
	{
		variants: {
			variant: {
				default: "border-transparent bg-slate-100 text-slate-950 hover:bg-slate-200",
				secondary: "border-transparent bg-slate-800 text-slate-100 hover:bg-slate-700",
				outline: "border-slate-700 text-slate-100",
				blue: "border-transparent bg-blue-100 text-blue-950 hover:bg-blue-200",
				green: "border-transparent bg-emerald-100 text-emerald-950 hover:bg-emerald-200",
				amber: "border-transparent bg-amber-100 text-amber-950 hover:bg-amber-200",
				rose: "border-transparent bg-rose-100 text-rose-950 hover:bg-rose-200",
				purple: "border-transparent bg-violet-100 text-violet-950 hover:bg-violet-200",
				cyan: "border-transparent bg-cyan-100 text-cyan-950 hover:bg-cyan-200",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
