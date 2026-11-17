import React from "react";
import content from "@/content";

import TourTopbar1 from "@/components/shared/TourTopbar1";
import TourHeader1 from "@/components/shared/TourHeader1";
import TourFooter1 from "@/components/shared/TourFooter1";
import TourBanner1 from "@/components/home/TourBanner1";
import TourAbout1 from "@/components/home/TourAbout1";
import TourServices1 from "@/components/home/TourServices1";
import TourPopularTours1 from "@/components/home/TourPopularTours1";
import TourStats1 from "@/components/home/TourStats1";
import TourTopDestinations1 from "@/components/home/TourTopDestinations1";
import TourGallery1 from "@/components/home/TourGallery1";
import TourWhyChooseUs1 from "@/components/home/TourWhyChooseUs1";
import TourTestimonial1 from "@/components/home/TourTestimonial1";
import TourContact1 from "@/components/home/TourContact1";

function renderVariant<Data>(
  section: { variants: Record<string, Data> } | undefined,
  Component: React.ComponentType<{ data: Data }>,
) {
  return function renderSection(variant: string, key: string) {
    const data = section?.variants[variant];
    return data ? <Component key={key} data={data} /> : null;
  };
}

const sections = content.Tour.sections;
const componentRegistry: Record<
  string,
  Record<string, (variant: string, key: string) => React.ReactNode>
> = {
  Banner: { TourBanner1: renderVariant(sections.Banner, TourBanner1) },
  About: { TourAbout1: renderVariant(sections.About, TourAbout1) },
  Services: { TourServices1: renderVariant(sections.Services, TourServices1) },
  PopularTours: { TourPopularTours1: renderVariant(sections.PopularTours, TourPopularTours1) },
  CompanyStatistics: { TourStats1: renderVariant(sections.CompanyStatistics, TourStats1) },
  TopDestinations: { TourTopDestinations1: renderVariant(sections.TopDestinations, TourTopDestinations1) },
  Gallery: { TourGallery1: renderVariant(sections.Gallery, TourGallery1) },
  WhyChooseUs: { TourWhyChooseUs1: renderVariant(sections.WhyChooseUs, TourWhyChooseUs1) },
  Testimonial: { TourTestimonial1: renderVariant(sections.Testimonial, TourTestimonial1) },
  Contact: { TourContact1: renderVariant(sections.Contact, TourContact1) },
};

export default function Home() {
  const templateConfig = content.Tour.templateComponents["template-1"];
  const shared = templateConfig.shared;
  const homeComponents = templateConfig.pages.home.components;

  const topbarData = shared.Topbar
    ? sections.Topbar?.variants[shared.Topbar]
    : undefined;
  const headerData = sections.Header?.variants[shared.Header];
  const footerData = sections.Footer?.variants[shared.Footer];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {topbarData && <TourTopbar1 data={topbarData} />}
      {headerData && <TourHeader1 data={headerData} />}

      <main className="flex-1">
        {homeComponents.map(({ key, component }, index) =>
          componentRegistry[key]?.[component]?.(component, `${key}-${index}`),
        )}
      </main>

      {footerData && <TourFooter1 data={footerData} />}
    </div>
  );
}
