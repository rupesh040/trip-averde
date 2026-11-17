"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PhoneCall, Star } from "lucide-react";
import type { TestimonialData } from "@/type";

interface TourTestimonial1Props {
  data: TestimonialData;
}

export default function TourTestimonial1({ data }: TourTestimonial1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data?.items.length) return null;

  const { items } = data;
  const currentItem = items[currentIndex];

  const move = (step: number) => {
    setCurrentIndex((index) => (index + step + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="scroll-mt-24 bg-[linear-gradient(120deg,#faf8f2,#f5f6f0_60%,#faf8f2)] py-12 sm:py-16 lg:py-[4.8vw]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 sm:px-[4%] md:grid-cols-[1fr_1.04fr] md:gap-[6%]">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <div className="mb-2 flex items-center gap-3 text-xs font-bold tracking-[0.13em] text-[var(--tour-green)] uppercase sm:text-sm">
            {data.cursiveText || "Testimonials"}
            <span className="h-px w-10 bg-[var(--tour-gold)]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-[clamp(2.05rem,4.2vw,3.8rem)] leading-[1.06] font-bold tracking-[-0.035em] text-[var(--tour-green)]">
            {data.headingPart1 || "Travelers"}{" "}
            <span className="text-[var(--tour-gold)]">{data.headingPart2 || "Reviews"}</span>
          </h2>
          {data.description && (
            <p className="mt-3 max-w-[34rem] text-sm leading-[1.5] text-[#454b4a] sm:text-base">
              {data.description}
            </p>
          )}

          {!!data.galleryImages?.length && (
            <div className="flex items-center px-2 pt-5 pb-6 sm:pt-6 sm:pb-8">
              {data.galleryImages.slice(0, 2).map((src, index) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.04, rotate: index === 0 ? -2 : 7 }}
                  transition={{ duration: 0.3 }}
                  className={`relative aspect-[1.55] w-[57%] border-[6px] border-white bg-white shadow-[0_3px_10px_#24342e33] sm:border-[7px] ${index === 0 ? "z-10 -rotate-[4deg]" : "-ml-[17%] translate-y-[10%] rotate-[5deg]"}`}
                >
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 60vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
          )}

          {data.phone && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-stretch overflow-hidden rounded-full border border-[#d7a443] bg-[#fbf9f3] text-[var(--tour-green)] transition-colors hover:bg-white"
            >
              <span className="grid w-13 shrink-0 place-items-center bg-[var(--tour-green)] text-white sm:w-15">
                <PhoneCall className="size-[1.65rem]" aria-hidden="true" strokeWidth={1.5} />
              </span>
              <span className="my-2 ml-3 border-l border-[#dfa845] py-0.5 pr-5 pl-3">
                <span className="block text-xs font-semibold text-[#454b4a]">Call Us Now</span>
                <span className="block font-extrabold sm:text-lg">{data.phone}</span>
              </span>
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 px-2 pt-14 sm:px-4 md:px-0"
          aria-label="Traveler reviews"
        >
          <div className="relative rounded-[1.5rem] border border-[#ebe9e1] border-b-4 border-b-[#e4ab43] bg-[#fbf9f4] px-7 pt-16 pb-8 text-center shadow-[0_4px_18px_#253c2920] sm:px-10 md:px-8">
            <div aria-live="polite" aria-atomic="true">
              <div className="absolute top-0 left-1/2 size-[clamp(5.5rem,11vw,9rem)] -translate-x-1/2 -translate-y-[56%] overflow-hidden rounded-full border-4 border-[#dba33b] bg-[#edf4e5] shadow-sm">
                <Image src={currentItem.image} alt="" fill sizes="(min-width: 920px) 11vw, 88px" className="object-cover" />
              </div>

              <div className="flex items-center justify-center gap-2 text-[#bd8123] sm:gap-3">
                <span aria-hidden="true" className="translate-y-2 font-serif text-5xl leading-[0.6] font-bold">“</span>
                <span aria-hidden="true" className="h-px grow bg-[#e3bd72]" />
                <div className="flex gap-0.5 px-1" aria-label={`${currentItem.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} aria-hidden="true" className={`size-4 sm:size-[1.15rem] ${index < currentItem.rating ? "fill-current" : ""}`} strokeWidth={1.2} />
                  ))}
                </div>
                <span aria-hidden="true" className="h-px grow bg-[#e3bd72]" />
                <span aria-hidden="true" className="translate-y-2 font-serif text-5xl leading-[0.6] font-bold">”</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <blockquote className="mx-auto mt-4 max-w-[33rem] text-sm leading-[1.65] text-[#233037] sm:text-base">
                    <p>{currentItem.quote}</p>
                  </blockquote>
                  <p className="mt-4 text-lg font-extrabold text-[var(--tour-green)] sm:text-xl">{currentItem.name}</p>
                  <p className="mt-0.5 text-sm text-[#505656]">{currentItem.title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {items.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous testimonial"
                className="grid size-9 cursor-pointer place-items-center rounded-full bg-[var(--tour-green)] text-white shadow-sm transition-colors hover:bg-[var(--tour-deep)] sm:size-10"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </motion.button>
              <div className="flex items-center gap-1.5 px-2">
                {items.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show ${item.name}'s review`}
                    aria-pressed={currentIndex === index}
                    className="grid size-6 cursor-pointer place-items-center rounded-full"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "w-6 bg-[var(--tour-green)]"
                          : "w-2.5 bg-[#c4cac3] hover:bg-stone-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={() => move(1)}
                aria-label="Next testimonial"
                className="grid size-9 cursor-pointer place-items-center rounded-full bg-[var(--tour-green)] text-white shadow-sm transition-colors hover:bg-[var(--tour-deep)] sm:size-10"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
