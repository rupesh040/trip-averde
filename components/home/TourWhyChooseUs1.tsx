import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";
import type { WhyChooseUsData } from "@/type";

interface TourWhyChooseUs1Props {
  data: WhyChooseUsData;
}

export default function TourWhyChooseUs1({ data }: TourWhyChooseUs1Props) {
  if (!data) return null;

  const [accent, ...headingSuffix] = (data.headingPart2 || "Adventure With Us").split(" ");

  return (
    <section
      id="why-choose-us"
      className="relative isolate grid scroll-mt-24 overflow-hidden bg-[linear-gradient(90deg,#023128_0%,#05493d_50%,#0c5c4e_100%)] text-white shadow-2xl md:min-h-[clamp(300px,33.5vw,520px)] md:items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_25%,rgba(16,185,129,0.22)_0%,transparent_60%),radial-gradient(circle_at_15%_80%,rgba(6,77,72,0.6)_0%,transparent_50%)]"
      />

      {data.image1 && (
        <div className="relative aspect-[4/3] overflow-hidden md:absolute md:inset-y-0 md:left-0 md:-z-10 md:aspect-auto md:w-[48%]">
          <Image
            src={data.image1}
            alt=""
            fill
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover object-left-bottom"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#023128_0%,transparent_65%)] md:bg-[linear-gradient(90deg,transparent_55%,#02312899_78%,#023128_100%)]" />
        </div>
      )}

      <div className="relative mx-auto flex w-full max-w-[1440px] justify-center px-6 pt-4 pb-10 text-center md:justify-end md:px-[4%] md:py-12">
        <div className="w-full max-w-[720px] md:w-[58%]">
          <div aria-hidden="true" className="mb-3 flex items-center justify-center gap-5 md:gap-8">
            <span className="h-[2px] w-11 bg-[#e2ad45] md:w-[4.5rem]" />
            <Send className="size-8 sm:size-10" strokeWidth={1.65} />
            <span className="h-[2px] w-11 bg-[#e2ad45] md:w-[4.5rem]" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,4.8vw,4.3rem)] leading-[1.04] font-bold tracking-[-0.035em]">
            {data.headingPart1 || "Plan Your Next"}
            <br />
            <span className="text-[#f5be50]">{accent}</span>{" "}
            {headingSuffix.join(" ")}
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-pretty text-[clamp(1rem,2.1vw,1.55rem)] leading-[1.4] text-white/95">
            {data.description}
          </p>
          {data.buttonText && (
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[linear-gradient(90deg,#f5be50_0%,#e4a838_100%)] px-5 py-2.5 text-sm font-bold text-[#023128] shadow-md transition-all hover:bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_100%)] hover:shadow-lg"
            >
              {data.buttonText}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
