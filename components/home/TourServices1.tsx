import Image from "next/image";
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
      <div className="mx-auto grid max-w-[1440px] items-center gap-11 px-[clamp(1.25rem,2vw,2rem)] min-[960px]:grid-cols-[3.05fr_2fr] min-[960px]:gap-4">
        <div>
          <div className="min-[960px]:pl-[3.25vw] min-[1440px]:pl-12">
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
          </div>

          <ul className="mt-[clamp(1.3rem,2.2vw,2.1rem)] grid gap-x-2 gap-y-3 min-[570px]:grid-cols-2 min-[760px]:grid-cols-3">
            {data.items.map((item) => {
              const Icon = serviceIcons[item.icon as keyof typeof serviceIcons] || Compass;
              const Card = item.href ? "a" : "div";

              return (
                <li key={item.title}>
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
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative isolate mx-auto aspect-square w-[calc(100%-2rem)] max-w-[550px] min-[960px]:mx-0 min-[960px]:ml-3 min-[960px]:w-[calc(100%-1rem)]">
          <span aria-hidden="true" className="absolute -top-2 -left-3 -z-10 h-2/5 w-1/2 -rotate-[10deg] rounded-[27%_28%_18%_23%] bg-[#0c694b]" />
          <span aria-hidden="true" className="absolute -right-2 -bottom-2 -z-10 h-[38%] w-[58%] -rotate-[8deg] rounded-[28%_19%_27%_19%] bg-[#d9a745]" />
          <div className="relative h-full w-full -rotate-[8deg] overflow-hidden rounded-[20%_11%_18%_13%] border-[clamp(4px,.55vw,8px)] border-white shadow-[0_2px_8px_#12351e33]">
            <Image
              src={data.sideImage || "/banner/london.webp"}
              fill
              sizes="(max-width: 959px) 85vw, (max-width: 1440px) 40vw, 550px"
              alt="Big Ben and Westminster Bridge from across the Thames"
              className="translate-y-[3%] scale-[1.13] rotate-[8deg] object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
