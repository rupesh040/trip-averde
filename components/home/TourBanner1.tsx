"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { BannerData } from "@/type";

interface TourBanner1Props {
  data: BannerData;
}

export default function TourBanner1({ data }: TourBanner1Props) {
  const background = data.banners[0] || "/banner/hero-banner.png";
  const eyebrow = data.eyebrow || data.cursiveText;

  return (
    <section id="home" className="relative isolate flex min-h-[416px] scroll-mt-24 items-center overflow-hidden bg-(--tour-deep) text-white sm:min-h-[clamp(420px,43.8vw,770px)]">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-30"
      >
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[62%_center] sm:object-center"
        />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#054739_0%,#054739dc_16%,#05473980_32%,transparent_58%)] max-sm:bg-[linear-gradient(90deg,#033f32f7_2%,#033f32b0_51%,#033f324f_100%)]" />

      <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,6.7vw,6rem)] pt-12 pb-20 sm:-translate-y-4">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex items-center gap-3.5 text-[clamp(0.64rem,1.1vw,1rem)] font-bold tracking-[0.25em] uppercase"
          >
            {eyebrow}
            <span aria-hidden="true" className="h-0.5 w-[clamp(1.6rem,4.6vw,4rem)] bg-[#e4b24f]" />
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.6rem,5.25vw,5rem)] leading-[1.01] font-bold tracking-[-0.02em] text-white"
        >
          {data.headingPart1 ? (
            <>
              <span className="block">{data.headingPart1}</span>
              {data.headingPart2}{" "}<span className="text-[#edb94e]">{data.headingPart3}</span>
            </>
          ) : data.heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-[35ch] text-[clamp(0.94rem,1.37vw,1.25rem)] leading-[1.5] font-medium"
        >
          {data.description}
        </motion.p>
        {data.ctaText && data.ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="mt-5 inline-flex rounded-lg bg-[#e6b24b] px-4 py-2 font-bold text-(--tour-deep) transition-transform hover:scale-105" href={data.ctaHref}>
              {data.ctaText}
            </a>
          </motion.div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[clamp(2.75rem,7.25vw,7.5rem)]" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block size-full">
          <path d="M0 0C180 25 253 79 497 100H0ZM1440 25C1300 58 1221 84 1060 100H1440Z" fill="#efc36b" />
          <path d="M0 35C152 16 249 82 448 100H0ZM1440 60C1313 76 1253 94 1136 100H1440Z" fill="var(--tour-deep)" />
        </svg>
      </div>
    </section>
  );
}
