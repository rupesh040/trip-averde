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
      className="relative isolate grid scroll-mt-24 overflow-hidden bg-[#022c23] text-white shadow-2xl md:min-h-[clamp(340px,36vw,540px)] md:items-center"
    >
      {data.image1 && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={data.image1}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[25%_center] md:object-[left_center]"
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,#022c23_0%,#033d31_55%,rgba(5,78,63,0.5)_75%,transparent_100%)] md:bg-[linear-gradient(270deg,#022c23_0%,#022c23_30%,#033d31_48%,rgba(5,78,63,0.75)_68%,rgba(5,78,63,0.3)_82%,transparent_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_35%,rgba(16,185,129,0.2)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] justify-center px-6 pt-12 pb-12 text-center md:justify-end md:px-[5%] md:py-16">
        <div className="w-full max-w-[700px] md:w-[56%]">
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
