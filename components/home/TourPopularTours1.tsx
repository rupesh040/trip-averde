"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PopularTourItem, PopularToursData } from "@/type";

interface TourPopularTours1Props {
  data: PopularToursData;
}

function TourCard({ tour, index }: { tour: PopularTourItem; index: number }) {
  const featured = index < 2;
  const span = index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4";
  const height = featured ? "lg:h-[clamp(16rem,26.2vw,23.5rem)]" : "lg:h-[clamp(12rem,20vw,18rem)]";
  const desktopSize = index === 0 ? "54vw" : index === 1 ? "38vw" : "31vw";
  const slug = tour.title.toLowerCase().replace(/ tour$/, "").replace(/\W+/g, "-").replace(/^-|-$/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`h-52 sm:h-56 ${span} ${height}`}
    >
      <a
        id={`tour-${slug}`}
        href={tour.href || "#contact"}
        className="group relative isolate block size-full overflow-hidden rounded-[1.35rem] bg-(--tour-deep) text-white shadow-md lg:rounded-[1.6rem]"
      >
        <Image
          src={tour.image}
          alt=""
          fill
          sizes={`(max-width: 639px) 94vw, (max-width: 1023px) 47vw, ${desktopSize}`}
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-[#033d32]/95 via-[#034739]/45 to-transparent" />
        {index === 0 && (
          <div className="absolute -bottom-23 -left-[20%] h-40 w-[108%] rotate-12 rounded-[50%] bg-linear-to-b from-[#084e40] to-[#033d32]" />
        )}
        {index === 1 && (
          <div className="absolute inset-0 bg-[linear-gradient(270deg,#033d32_0%,rgba(3,61,50,0.85)_40%,rgba(3,71,57,0.35)_75%,transparent_100%)]" />
        )}
        <h3 className="absolute bottom-4 left-[5%] font-serif text-[clamp(1.6rem,2.7vw,2.55rem)] leading-tight font-bold">
          {tour.title}
          <span className="mt-1.5 block h-1 w-14 rounded-full bg-[#e6b24b] sm:w-16" />
        </h3>
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

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {data.items.map((tour, index) => (
            <TourCard key={tour.title} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
