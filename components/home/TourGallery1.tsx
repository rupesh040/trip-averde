"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Camera, Eye, X } from "lucide-react";
import type { GalleryData, GalleryItem } from "@/type";

interface TourGallery1Props {
  data: GalleryData;
}

const mosaicPlacement = [
  "row-span-2 md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "row-span-2 md:col-start-3 md:row-start-1",
  "md:col-start-4 md:row-start-1",
  "md:col-start-4 md:row-start-2",
];

export default function TourGallery1({ data }: TourGallery1Props) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const preview = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = preview.current;
    if (selectedImage && dialog && !dialog.open) dialog.showModal();
  }, [selectedImage]);

  if (!data) return null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-24 bg-white pt-[clamp(2.25rem,3vw,3rem)] pb-[clamp(3.25rem,6.2vw,6rem)]">
      <div className="mx-auto max-w-[1400px] px-[1.75%]">
        <div className="mb-[clamp(1.45rem,2.55vw,2.5rem)] px-2 text-center">
          <p className="mb-1.5 inline-flex items-center gap-3 text-xs font-extrabold tracking-[0.21em] text-(--tour-deep) uppercase before:h-0.5 before:w-8 before:bg-(--tour-gold) after:h-0.5 after:w-8 after:bg-(--tour-gold) sm:gap-5 sm:text-base sm:before:w-14 sm:after:w-14">
            <span className="inline-flex items-center gap-1.5">
              <Camera aria-hidden="true" className="size-[1.2em] text-(--tour-gold)" />
              {data.cursiveText || "Gallery"}
            </span>
          </p>
          <h2 id="gallery-title" className="font-serif text-[clamp(1.9rem,3.6vw,3.3rem)] leading-tight font-bold tracking-tight text-(--tour-deep)">
            {data.headingPart1}{" "}
            <span className="text-(--tour-gold)">{data.headingPart2}</span>
          </h2>
          <p className="mx-auto mt-1.5 max-w-4xl text-[clamp(0.85rem,1.25vw,1.06rem)] leading-relaxed text-stone-700">
            {data.description}
          </p>
        </div>

        <div className="grid grid-flow-dense auto-rows-[clamp(5.5rem,24vw,10rem)] grid-cols-2 gap-2.5 md:auto-rows-[clamp(6rem,13vw,11.25rem)] md:grid-cols-[1fr_0.97fr_0.87fr_1.02fr] md:gap-3">
          {data.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`View ${item.title || item.label || "gallery image"}`}
              onClick={() => setSelectedImage(item)}
              className={`group relative cursor-zoom-in overflow-hidden rounded-[0.85rem] bg-stone-100 text-left ${mosaicPlacement[index] || ""}`}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 767px) 48vw, (max-width: 1450px) 25vw, 365px"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Eye aria-hidden="true" className="size-4" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={preview}
        aria-label={selectedImage?.title || "Gallery image preview"}
        onClose={() => setSelectedImage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[92vh] w-[min(95vw,64rem)] max-w-none overflow-y-auto rounded-2xl bg-[#052f28] p-0 text-white backdrop:bg-black/80"
      >
        {selectedImage && (
          <figure className="relative p-2">
            <button
              type="button"
              aria-label="Close image preview"
              onClick={() => preview.current?.close()}
              className="absolute top-4 right-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-black/65 text-white transition-colors hover:bg-white hover:text-black"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
            <div className="relative h-[min(68vh,42rem)]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title || selectedImage.label || "Travel gallery"}
                fill
                sizes="(max-width: 1024px) 95vw, 1024px"
                className="rounded-lg object-contain"
              />
            </div>
            {selectedImage.title && (
              <figcaption className="px-4 py-3 text-center">
                <h3 className="font-serif text-xl font-bold">{selectedImage.title}</h3>
                {selectedImage.subtitle && <p className="mt-0.5 text-sm text-[#f3cf77]">{selectedImage.subtitle}</p>}
              </figcaption>
            )}
          </figure>
        )}
      </dialog>
    </section>
  );
}
