"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Compass, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import type { AboutData } from "@/type";

interface TourAbout1Props {
  data: AboutData;
}

const featureIcons = {
  MapPin,
  Suitcase: Briefcase,
  Package: Briefcase,
  Luggage: Briefcase,
  ShieldCheck,
  Users: UsersRound,
  Customer: UsersRound,
};

export default function TourAbout1({ data }: TourAbout1Props) {
  return (
    <section id="about" className="scroll-mt-24 bg-white pt-[clamp(3.75rem,9vw,8rem)] pb-[clamp(3rem,6vw,6rem)]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-[clamp(1.25rem,2vw,2rem)] md:grid-cols-[38%_1fr] md:gap-[clamp(2rem,4vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate mx-auto w-full max-w-[360px] min-[480px]:max-w-[390px] md:mx-0 md:max-w-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 150 160"
            className="pointer-events-none absolute -top-3 -left-3 -z-10 h-[130px] w-[120px] text-(--tour-green) sm:-top-3.5 sm:-left-3.5 sm:h-[150px] sm:w-[140px]"
            fill="none"
          >
            <path
              d="M140 10 H54 C30 10 10 30 10 54 V150"
              stroke="currentColor"
              strokeWidth="19"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 150 95"
            className="pointer-events-none absolute -right-3 -bottom-3 -z-10 h-[75px] w-[120px] text-(--tour-green) sm:-right-3.5 sm:-bottom-3.5 sm:h-[90px] sm:w-[140px]"
            fill="none"
          >
            <path
              d="M10 85 H96 C120 85 140 65 140 41 V10"
              stroke="currentColor"
              strokeWidth="19"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="group relative aspect-[384/524] w-full overflow-hidden rounded-[2.35rem] border-[6px] border-white bg-stone-100 shadow-[0_16px_36px_#06433722] sm:rounded-[2.75rem] sm:border-[8px]">
            <Image
              src={data.mainImage || "/banner/about-framed.webp"}
              fill
              sizes="(max-width: 767px) 88vw, (max-width: 1440px) 38vw, 480px"
              alt="A shikara boat on Dal Lake with snow-covered mountains behind it"
              className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:pt-[clamp(.45rem,.8vw,.9rem)]"
        >
          <p className="mb-[clamp(.7rem,1.3vw,1.5rem)] flex items-center gap-4 text-[clamp(.8rem,1.9vw,1.55rem)] font-extrabold tracking-[0.18em] text-(--tour-green) uppercase">
            {data.cursiveText || "About Us"}
            <span aria-hidden="true" className="h-0.5 w-[clamp(2.75rem,6vw,5rem)] bg-(--tour-gold)" />
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,5.75vw,5.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-(--tour-green)">
            <span className="block">{data.headingPart1 || "Your Trusted"}</span>
            <span className="block text-(--tour-gold)">{data.headingPart2 || "Travel Partner"}</span>
            {data.headingPart3 && <span className="block">{data.headingPart3}</span>}
          </h2>

          <p className="mt-[clamp(1rem,1.8vw,1.75rem)] text-[clamp(1rem,1.67vw,1.42rem)] leading-[1.52] text-(--foreground)">
            {data.description}
          </p>

          <ul className="mt-[clamp(1.6rem,3.4vw,3.5rem)] grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {data.features.map((feature, index) => {
              const Icon = featureIcons[feature.icon as keyof typeof featureIcons] || Compass;

              return (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center px-2 text-center sm:not-last:after:absolute sm:not-last:after:right-0 sm:not-last:after:top-[28%] sm:not-last:after:bottom-0 sm:not-last:after:w-px sm:not-last:after:bg-[#0b4d3b20]"
                >
                  <span className="grid h-[clamp(3.25rem,6.3vw,5.75rem)] w-[clamp(3.75rem,7.1vw,6.25rem)] place-items-center rounded-[28%] bg-[#eef5ea] text-(--tour-gold) transition-colors group-hover:bg-[#e4ede0]">
                    <Icon aria-hidden="true" className="size-[clamp(1.8rem,4.1vw,3.75rem)]" strokeWidth={1.65} />
                  </span>
                  <span className="mt-3 max-w-[7.85em] text-[clamp(.9rem,1.55vw,1.3rem)] leading-[1.19] font-extrabold text-balance text-(--tour-green) group-first:max-w-[7em] group-last:max-w-[7em]">
                    {feature.title}
                  </span>
                  {feature.description && <p className="mt-1 text-sm text-(--foreground)">{feature.description}</p>}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
