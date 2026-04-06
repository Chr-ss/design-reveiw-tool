"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";

import { cn } from "@/lib/utils";

export type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
	src: string;
	alt: string;
	className?: string;
	imageClassName?: string;
	dialogImageClassName?: string;
	placeholder?: React.ReactNode;
	enablePreview?: boolean;
};

function DefaultPlaceholder({ hasError }: { hasError: boolean }) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-500">
			<svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
				<path d="M5 5h14v14H5z" fill="none" />
				<path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM8.5 11A1.5 1.5 0 1 0 8.5 8a1.5 1.5 0 0 0 0 3zm1.5 2-2.5 3h9l-3.5-4.5-2.5 3.2L10 13z" />
			</svg>
			<span className="px-2 text-center text-xs font-medium">
				{hasError ? "Image unavailable" : "Loading image..."}
			</span>
		</div>
	);
}

export function Image({
	src,
	alt,
	className,
	imageClassName,
	dialogImageClassName,
	placeholder,
	enablePreview = true,
	loading,
	decoding,
	onLoad,
	onError,
	...imgProps
}: ImageProps) {
	const [hasLoaded, setHasLoaded] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

	React.useEffect(() => {
		setHasLoaded(false);
		setHasError(false);
		setIsPreviewOpen(false);
	}, [src]);

	React.useEffect(() => {
		if (!isPreviewOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsPreviewOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [isPreviewOpen]);

	const showPlaceholder = !hasLoaded || hasError;
	const canPreview = enablePreview && hasLoaded && !hasError;

	return (
		<>
			<button
				type="button"
				className={cn(
					"group relative block aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-left",
					canPreview ? "cursor-zoom-in" : "cursor-default",
					className,
				)}
				onClick={() => {
					if (canPreview) {
						setIsPreviewOpen(true);
					}
				}}
				aria-label={canPreview ? `Open full-size image: ${alt}` : alt}
			>
				<img
					src={src}
					alt={alt}
					loading={loading ?? "lazy"}
					decoding={decoding ?? "async"}
					className={cn(
						"h-full w-full object-cover transition-opacity duration-200",
						hasLoaded && !hasError ? "opacity-100" : "opacity-0",
						imageClassName,
					)}
					onLoad={(event) => {
						setHasLoaded(true);
						setHasError(false);
						onLoad?.(event);
					}}
					onError={(event) => {
						setHasError(true);
						setHasLoaded(false);
						onError?.(event);
					}}
					{...imgProps}
				/>

				{showPlaceholder ? (
					<div className="absolute inset-0">
						{placeholder ?? <DefaultPlaceholder hasError={hasError} />}
					</div>
				) : null}
			</button>

			{isPreviewOpen ? (
				<div
					role="dialog"
					aria-modal="true"
					aria-label={`Full-size preview: ${alt}`}
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-2 sm:p-4"
					onClick={() => setIsPreviewOpen(false)}
				>
					<img
						src={src}
						alt={alt}
						className={cn("max-h-[96vh] max-w-[96vw] cursor-zoom-out object-contain", dialogImageClassName)}
						onClick={() => setIsPreviewOpen(false)}
					/>
				</div>
			) : null}
		</>
	);
}
