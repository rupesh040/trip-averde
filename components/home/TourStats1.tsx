"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Building2, Compass, House, Plane, Ship, Ticket } from "lucide-react";
import type { StatisticsData } from "@/type";

interface TourStats1Props {
  data: StatisticsData;
}

const statIcons = {
  Send: Plane,
  Plane,
  Building2,
  Building: Building2,
  House,
  Ship,
  Ticket,
};

export default function TourStats1({ data }: TourStats1Props) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = section.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      function tick(time: number) {
        const elapsed = Math.min((time - start) / 950, 1);
        setProgress(1 - (1 - elapsed) ** 2);
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.25 });

    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (!data) return null;

  return (
    <section ref={section} aria-label="TripAverde in numbers" className="relative isolate overflow-hidden bg-(--tour-deep) px-5 pt-[clamp(4.5rem,11.45vw,10rem)] pb-[clamp(2.5rem,8.75vw,7.65rem)]">
      {data.backgroundImage && (
        <Image src={data.backgroundImage} alt="" fill sizes="100vw" className="object-cover" />
      )}

      <div className="relative mx-auto grid max-w-[min(82vw,72rem)] grid-cols-2 gap-x-3 gap-y-14 sm:gap-x-6 md:grid-cols-4">
        {data.stats.map((stat) => {
          const Icon = statIcons[stat.icon as keyof typeof statIcons] || Compass;
          const number = stat.isDecimal ? (stat.number * progress).toFixed(1) : Math.round(stat.number * progress);

          return (
            <div key={stat.label} className="relative rounded-[1.35rem] border-b-4 border-[#e0a939] bg-[#fcfaf3] px-1 pt-[clamp(1.8rem,3.8vw,3.6rem)] pb-[clamp(0.7rem,1.6vw,1.4rem)] text-center shadow-md">
              <div className="absolute top-0 left-1/2 grid size-[clamp(3.25rem,7.7vw,7rem)] -translate-x-1/2 -translate-y-[54%] place-items-center rounded-full border-[3px] border-[#edc56a] bg-[#076045] text-white">
                <Icon aria-hidden="true" className="h-[55%] w-[55%]" strokeWidth={1.45} />
              </div>
              <p className="text-[clamp(1.65rem,3.25vw,3.3rem)] leading-none font-extrabold text-(--tour-green)">
                <span aria-hidden="true">{number}{stat.suffix}</span>
                <span className="sr-only">{stat.number}{stat.suffix}</span>
              </p>
              <p className="mt-1 text-[clamp(0.65rem,1.48vw,1.25rem)] font-semibold text-stone-900">{stat.label}</p>
              <span className="mx-auto mt-[clamp(0.45rem,1.1vw,0.95rem)] block h-1 w-[25%] rounded-full bg-(--tour-gold)" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
