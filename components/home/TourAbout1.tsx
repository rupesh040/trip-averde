import Image from "next/image";
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
      <div className="mx-auto grid max-w-[1440px] items-start gap-8 px-[clamp(1.25rem,2vw,2rem)] md:grid-cols-[38%_1fr] md:gap-[clamp(1.5rem,3.75vw,3.5rem)]">
        <Image
          src={data.mainImage || "/banner/about-framed.jpg"}
          width={384}
          height={524}
          sizes="(max-width: 767px) 86vw, (max-width: 1440px) 38vw, 530px"
          alt="A shikara boat on Dal Lake with snow-covered mountains behind it"
          className="mx-auto h-auto w-full max-w-[360px] md:max-w-none"
        />

        <div className="md:pt-[clamp(.45rem,.8vw,.9rem)]">
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
            {data.features.map((feature) => {
              const Icon = featureIcons[feature.icon as keyof typeof featureIcons] || Compass;

              return (
                <li key={feature.title} className="group relative flex flex-col items-center px-2 text-center sm:not-last:after:absolute sm:not-last:after:right-0 sm:not-last:after:top-[28%] sm:not-last:after:bottom-0 sm:not-last:after:w-px sm:not-last:after:bg-[#0b4d3b20]">
                  <span className="grid h-[clamp(3.25rem,6.3vw,5.75rem)] w-[clamp(3.75rem,7.1vw,6.25rem)] place-items-center rounded-[28%] bg-[#eef5ea] text-(--tour-gold)">
                    <Icon aria-hidden="true" className="size-[clamp(1.8rem,4.1vw,3.75rem)]" strokeWidth={1.65} />
                  </span>
                  <span className="mt-3 max-w-[7.85em] text-[clamp(.9rem,1.55vw,1.3rem)] leading-[1.19] font-extrabold text-balance text-(--tour-green) group-first:max-w-[7em] group-last:max-w-[7em]">
                    {feature.title}
                  </span>
                  {feature.description && <p className="mt-1 text-sm text-(--foreground)">{feature.description}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
