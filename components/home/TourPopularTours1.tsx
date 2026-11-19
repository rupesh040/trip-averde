"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PopularTourItem, PopularToursData } from "@/type";

interface TourPopularTours1Props {
  data: PopularToursData;
}

function TourCard({ tour, index }: { tour: PopularTourItem; index: number }) {
  const isTopRow = index < 2;
  const colSpan = isTopRow
    ? "sm:col-span-6"
    : "sm:col-span-6 lg:col-span-4";
  const aspect = isTopRow
    ? "aspect-[16/10] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]"
    : "aspect-[4/3] min-h-[200px] sm:min-h-[230px] lg:min-h-[260px]";
  const slug = tour.title.toLowerCase().replace(/ tour$/, "").replace(/\W+/g, "-").replace(/^-|-$/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative ${colSpan} ${aspect}`}
    >
      <a
        id={`tour-${slug}`}
        href={tour.href || "#contact"}
        className="group relative isolate block size-full overflow-hidden rounded-[1.75rem] bg-(--tour-deep) text-white shadow-md transition-shadow duration-300 hover:shadow-xl md:rounded-[2rem]"
      >
        <Image
          src={tour.image}
          alt=""
          fill
          sizes={isTopRow ? "(max-width: 767px) 94vw, 50vw" : "(max-width: 639px) 94vw, (max-width: 1023px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(3,61,50,0.15)_40%,rgba(3,61,50,0.75)_75%,#033d32_100%)]"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
          <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-bold tracking-tight text-white drop-shadow-sm">
            {tour.title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-2 block h-1 w-12 rounded-full bg-(--tour-gold) sm:w-14"
          />
        </div>
      </a>
    </motion.div>
  );
}

export default function TourPopularTours1({ data }: TourPopularTours1Props) {
  if (!data) return null;

  return (
    <section id="tours" aria-labelledby="tours-title" className="scroll-mt-24 bg-linear-to-b from-[#faf9f4] to-white pt-[clamp(2.25rem,3vw,3rem)] pb-[clamp(3.25rem,6vw,6rem)]">
      <div className="mx-auto max-w-[1400px] px-[4%]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[clamp(1.55rem,2.5vw,2.5rem)] text-center"
        >
          <p className="mb-2 inline-flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-(--tour-deep) uppercase before:h-0.5 before:w-8 before:bg-(--tour-gold) after:h-0.5 after:w-8 after:bg-(--tour-gold) sm:gap-4 sm:text-[clamp(0.8rem,1.4vw,1.125rem)] sm:before:w-14 sm:after:w-14">
            {data.cursiveText || "Choose Your Next Journey"}
          </p>
          <h2 id="tours-title" className="font-serif text-[clamp(2.45rem,5.2vw,4.5rem)] leading-tight font-bold tracking-tight text-(--tour-deep)">
            {data.headingPart1 || "Popular"}{" "}
            <span className="text-(--tour-gold)">{data.headingPart2 || "Tours"}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-5xl text-[clamp(0.9rem,1.45vw,1.18rem)] leading-relaxed text-stone-700">
            {data.description}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-12 lg:gap-6">
          {data.items.map((tour, index) => (
            <TourCard key={tour.title} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
