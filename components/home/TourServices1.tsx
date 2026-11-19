"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Bus, Camera, Compass, Globe, Plane, TreePalm } from "lucide-react";
import type { ServicesData } from "@/type";

interface TourServices1Props {
  data: ServicesData;
}

const serviceIcons = {
  Plane,
  Bed: BedDouble,
  Hotel: BedDouble,
  Bus,
  Palmtree: TreePalm,
  Island: TreePalm,
  Camera,
  Globe,
};

export default function TourServices1({ data }: TourServices1Props) {
  const secondLine = data.headingPart2 || "for Memorable Journeys";
  const prefix = secondLine.startsWith("for ") ? "for " : "";

  return (
    <section id="services" className="scroll-mt-24 overflow-hidden bg-white pt-[clamp(2rem,6vw,6rem)] pb-[clamp(3.75rem,8.4vw,7rem)]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-11 px-[clamp(1.25rem,2vw,2rem)] min-[960px]:grid-cols-[3.05fr_2fr] min-[960px]:gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-[960px]:pl-[3.25vw] min-[1440px]:pl-12"
          >
            <p className="mb-3 flex items-center gap-4 text-[clamp(.8rem,1.65vw,1.4rem)] font-extrabold tracking-[0.15em] text-(--tour-green) uppercase">
              {data.cursiveText || "Our Services"}
              <span aria-hidden="true" className="h-0.5 w-[clamp(2.75rem,5.6vw,5rem)] bg-(--tour-gold)" />
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,3.95vw,4rem)] leading-[1.04] font-bold tracking-[-0.02em] text-(--tour-green)">
              <span className="block">{data.headingPart1 || "Complete Travel Services"}</span>
              {prefix}<span className="text-(--tour-gold)">{secondLine.slice(prefix.length)}</span>
            </h2>
            <p className="mt-3 max-w-[46ch] text-[clamp(.95rem,1.32vw,1.2rem)] leading-[1.5] text-(--foreground)">
              {data.description}
            </p>
          </motion.div>

          <ul className="mt-[clamp(1.3rem,2.2vw,2.1rem)] grid gap-x-2 gap-y-3 min-[570px]:grid-cols-2 min-[760px]:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] || Compass;
              const Card = item.href ? "a" : "div";

              return (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card
                    href={item.href}
                    className="flex h-full min-h-[clamp(5.75rem,9.5vw,8.8rem)] items-center gap-[clamp(.4rem,.7vw,.8rem)] rounded-[18px] border border-[#eae9e2] bg-[#fcfbf7] py-[clamp(.65rem,1vw,1rem)] pr-2 pl-[clamp(.7rem,1.1vw,1.1rem)] shadow-[0_4px_8px_#102f2020] transition-colors hover:border-(--tour-gold)"
                  >
                    <span className="grid size-[clamp(2.25rem,4.1vw,3.7rem)] shrink-0 place-items-center rounded-[22%] bg-[#146943] text-white">
                      <Icon aria-hidden="true" className="size-[clamp(1.3rem,2.85vw,2.55rem)]" strokeWidth={1.55} />
                    </span>
                    <div className="border-l border-[#dcb455] pl-[clamp(.38rem,.65vw,.75rem)]">
                      <h3 className="text-[clamp(.83rem,1.28vw,1.2rem)] leading-[1.2] font-extrabold tracking-[-0.035em] text-(--tour-green)">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[clamp(.72rem,1.02vw,.95rem)] leading-[1.38] text-(--foreground)">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate mx-auto w-full max-w-[480px] min-[960px]:mx-0 min-[960px]:ml-auto min-[960px]:max-w-[530px]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 160 160"
            className="pointer-events-none absolute -top-3 -left-3 -z-10 h-[130px] w-[130px] text-(--tour-green) sm:-top-3.5 sm:-left-3.5 sm:h-[150px] sm:w-[150px]"
            fill="none"
          >
            <path
              d="M150 10 H54 C30 10 10 30 10 54 V150"
              stroke="currentColor"
              strokeWidth="19"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 160 110"
            className="pointer-events-none absolute -right-3 -bottom-3 -z-10 h-[85px] w-[130px] text-[#d9a745] sm:-right-3.5 sm:-bottom-3.5 sm:h-[100px] sm:w-[150px]"
            fill="none"
          >
            <path
              d="M10 100 H106 C130 100 150 80 150 56 V10"
              stroke="currentColor"
              strokeWidth="19"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="group relative aspect-[500/420] w-full overflow-hidden rounded-[2.35rem] border-[6px] border-white bg-stone-100 shadow-[0_16px_36px_#06433722] sm:rounded-[2.75rem] sm:border-[8px]">
            <Image
              src={data.sideImage || "/banner/london.webp"}
              fill
              sizes="(max-width: 959px) 90vw, (max-width: 1440px) 40vw, 540px"
              alt="Big Ben and Westminster Bridge from across the Thames"
              className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
