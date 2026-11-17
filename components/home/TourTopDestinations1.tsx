"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { TopDestinationsData } from "@/type";

interface TourTopDestinations1Props {
  data: TopDestinationsData;
}

const labelWave = "shape(from 0% 16%, curve to 100% 12% with 29% -33% / 59% 64%, line to 100% 100%, line to 0% 100%, close)";

function destinationId(name: string) {
  return `destination-${name.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "")}`;
}

export default function TourTopDestinations1({ data }: TourTopDestinations1Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function showLinkedDestination() {
      const carousel = track.current;
      if (!carousel) return;

      const destination = Array.from(carousel.children).find((card) => `#${card.id}` === window.location.hash);
      if (destination instanceof HTMLElement) carousel.scrollTo({ left: destination.offsetLeft, behavior: "instant" });
      requestAnimationFrame(syncCarouselState);
    }

    showLinkedDestination();
    window.addEventListener("hashchange", showLinkedDestination);
    return () => window.removeEventListener("hashchange", showLinkedDestination);
  }, []);

  if (!data) return null;

  function selectDestination(index: number) {
    const carousel = track.current;
    const card = carousel?.children[index];
    if (!carousel || !(card instanceof HTMLElement)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollTo({ left: card.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function syncCarouselState() {
    const carousel = track.current;
    const secondCard = carousel?.children[1];

    if (carousel && secondCard instanceof HTMLElement) {
      setActiveIndex(Math.round(carousel.scrollLeft / secondCard.offsetLeft));
      setCanGoPrevious(carousel.scrollLeft > 2);
      setCanGoNext(carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 2);
    }
  }

  return (
    <section id="destinations" aria-labelledby="destinations-title" className="scroll-mt-24 bg-linear-to-b from-[#faf9f5] to-[#f9f9f7] py-[clamp(3.5rem,6.7vw,6rem)]">
      <div className="mx-auto max-w-[1400px] px-[2.5%]">
        <div className="mb-[clamp(1.75rem,4.3vw,4rem)] px-2 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-(--tour-deep) uppercase before:h-0.5 before:w-8 before:bg-(--tour-gold) after:h-0.5 after:w-8 after:bg-(--tour-gold) sm:gap-5 sm:text-[clamp(0.8rem,1.65vw,1.35rem)] sm:before:w-14 sm:after:w-14">
            {data.cursiveText || "Top Destinations"}
          </p>
          <h2 id="destinations-title" className="font-serif text-[clamp(2.15rem,5.2vw,4.5rem)] leading-tight font-bold tracking-tight text-(--tour-deep)">
            {data.headingPart1}{" "}
            <span className="text-(--tour-gold)">{data.headingPart2}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-5xl text-[clamp(0.9rem,1.65vw,1.45rem)] leading-relaxed text-stone-700">
            {data.description}
          </p>
        </div>

        <div>
          <div
            id="destinations-track"
            ref={track}
            onScroll={syncCarouselState}
            className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-[1.65rem] [scrollbar-width:none]"
          >
            {data.items.map((item) => (
            <a
              key={item.name}
              id={destinationId(item.name)}
              href={item.href || "#contact"}
              className="group relative isolate aspect-[0.86] shrink-0 grow-0 basis-full snap-start overflow-hidden rounded-[1.65rem] bg-(--tour-deep) text-white focus-visible:outline-offset-[-4px] sm:basis-[calc((100%_-_1rem)_/_2)] md:basis-[calc((100%_-_2rem)_/_3)]"
            >
              <div className="absolute inset-x-0 top-0 h-[87%] overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 95vw, (max-width: 767px) 47vw, (max-width: 1450px) 31vw, 435px"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[28%] bg-linear-to-r from-[#e7b34d] via-[#fcf5cc] to-[#e0a234]" style={{ clipPath: labelWave }} />
              <div className="absolute inset-x-0 -bottom-px h-[27%] bg-linear-to-br from-[#0a5844] to-[#033a32]" style={{ clipPath: labelWave }} />
              <h3 className="absolute bottom-[5.6%] left-[9%] flex items-start gap-2.5 font-serif text-[clamp(1.65rem,3vw,2.9rem)] leading-tight font-bold">
                <MapPin aria-hidden="true" className="mt-[0.15em] size-[0.92em] shrink-0" strokeWidth={3} />
                <span>
                  {item.name}
                  <span className="mt-1.5 block h-1 w-14 rounded-full bg-[#e6b24b] sm:w-16" />
                </span>
              </h3>
            </a>
            ))}
          </div>

          {data.items.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
              <button
                type="button"
                aria-label="Show previous destinations"
                aria-controls="destinations-track"
                disabled={!canGoPrevious}
                onClick={() => selectDestination(Math.max(activeIndex - 1, 0))}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-(--tour-green)/15 bg-white text-(--tour-deep) shadow-sm transition hover:bg-(--tour-green) hover:text-white disabled:pointer-events-none disabled:opacity-40 sm:size-11"
              >
                <ChevronLeft aria-hidden="true" className="size-5 sm:size-6" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                aria-label="Show next destinations"
                aria-controls="destinations-track"
                disabled={!canGoNext}
                onClick={() => selectDestination(Math.min(activeIndex + 1, data.items.length - 1))}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-(--tour-green)/15 bg-white text-(--tour-deep) shadow-sm transition hover:bg-(--tour-green) hover:text-white disabled:pointer-events-none disabled:opacity-40 sm:size-11"
              >
                <ChevronRight aria-hidden="true" className="size-5 sm:size-6" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {data.items.length > 1 && (
          <div aria-label="Browse destinations" className={`mt-6 flex justify-center sm:mt-7 ${data.items.length < 3 ? "sm:hidden" : ""} ${data.items.length < 4 ? "md:hidden" : ""}`}>
            {data.items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show destinations starting with ${item.name}`}
                aria-controls="destinations-track"
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => selectDestination(index)}
                className={`group grid size-9 cursor-pointer place-items-center rounded-full ${index >= data.items.length - 1 ? "sm:hidden" : ""} ${index >= data.items.length - 2 ? "md:hidden" : ""}`}
              >
                <span className={`size-4 rounded-full transition-colors sm:size-[1.15rem] ${activeIndex === index ? "bg-[#dfa838]" : "bg-stone-300 group-hover:bg-stone-400"}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
