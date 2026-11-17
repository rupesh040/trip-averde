export interface TopbarData {
  location: string;
  timing: string;
  phone: string;
  email: string;
  social: {
    name: string;
    icon: string;
    href: string;
  }[];
}

export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  children?: {
    name: string;
    href: string;
  }[];
}

export interface HeaderData {
  logo: string;
  brandName?: string;
  links: NavLink[];
  button?: string;
  phone?: string;
}

export interface BannerData {
  banners: string[];
  bottomOverlay?: string;
  cursiveText?: string;
  eyebrow?: string;
  heading: string;
  headingPart1?: string;
  headingPart2?: string;
  headingPart3?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface AboutFeature {
  title: string;
  description?: string;
  icon?: string;
}

export interface AboutData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  headingPart3?: string;
  description: string;
  features: AboutFeature[];
  buttonText?: string;
  mainImage: string;
  smallImage?: string;
  badge?: string;
}

export interface ServiceItem {
  icon: string;
  image?: string;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
  slug?: string;
}

export interface ServicesData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  items: ServiceItem[];
  sideImage?: string;
}

export interface PopularTourItem {
  discount?: string;
  image: string;
  title: string;
  price?: string;
  originalPrice?: string;
  rating?: string;
  duration?: string;
  href?: string;
}

export interface PopularToursData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  items: PopularTourItem[];
}

export interface StatItem {
  number: number;
  suffix?: string;
  label: string;
  icon?: string;
  isDecimal?: boolean;
}

export interface StatisticsData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  headingPart3?: string;
  description?: string;
  backgroundImage?: string;
  stats: StatItem[];
}

export interface DestinationItem {
  name: string;
  image: string;
  rotation?: string;
  linkText?: string;
  href?: string;
  subtitle?: string;
  badge?: string;
  filter?: string;
}

export interface TopDestinationsData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  items: DestinationItem[];
  buttonText?: string;
}

export interface GalleryItem {
  id: string;
  label?: string;
  title?: string;
  subtitle?: string;
  image: string;
  category?: string;
}

export interface GalleryData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  initialCount?: number;
  viewMore?: string;
  viewLess?: string;
  items: GalleryItem[];
}

export interface WhyChooseUsData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  features?: {
    title: string;
    description: string;
  }[];
  buttonText?: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export interface TestimonialItem {
  image: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
}

export interface TestimonialData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description?: string;
  phone?: string;
  email?: string;
  galleryImages?: string[];
  items: TestimonialItem[];
}

export interface ContactData {
  cursiveText?: string;
  headingPart1?: string;
  headingPart2?: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  image?: string;
  formTitle?: string;
  formSubtitle?: string;
  buttonText?: string;
}

export interface FooterData {
  logo?: string;
  brandName?: string;
  backgroundImage?: string;
  description: string;
  cursiveText?: string;
  quickLinks: {
    name: string;
    href: string;
  }[];
  services: {
    name: string;
    href: string;
  }[];
  destinations?: {
    name: string;
    href: string;
  }[];
  social: {
    name: string;
    icon: string;
    href: string;
  }[];
  contact: {
    phone: string;
    timing: string;
    email: string;
    emailSub?: string;
    address: string;
    mapUrl?: string;
  };
  bottomBar: {
    copyright: string;
    links?: {
      name: string;
      href: string;
    }[];
  };
}

export interface TourSections {
  Topbar?: {
    variants: Record<string, TopbarData>;
  };
  Header?: {
    variants: Record<string, HeaderData>;
  };
  Banner?: {
    variants: Record<string, BannerData>;
  };
  About?: {
    variants: Record<string, AboutData>;
  };
  Services?: {
    variants: Record<string, ServicesData>;
  };
  PopularTours?: {
    variants: Record<string, PopularToursData>;
  };
  CompanyStatistics?: {
    variants: Record<string, StatisticsData>;
  };
  TopDestinations?: {
    variants: Record<string, TopDestinationsData>;
  };
  Gallery?: {
    variants: Record<string, GalleryData>;
  };
  WhyChooseUs?: {
    variants: Record<string, WhyChooseUsData>;
  };
  Testimonial?: {
    variants: Record<string, TestimonialData>;
  };
  Contact?: {
    variants: Record<string, ContactData>;
  };
  Footer?: {
    variants: Record<string, FooterData>;
  };
}

export interface ComponentConfig {
  key: string;
  component: string;
}

export interface TemplatePageConfig {
  components: ComponentConfig[];
  expand?: string;
}

export interface TemplateConfig {
  shared: {
    Topbar?: string;
    Header: string;
    Footer: string;
  };
  pages: Record<string, TemplatePageConfig>;
}

export interface TourSchema {
  Tour: {
    templateComponents: Record<string, TemplateConfig>;
    sections: TourSections;
  };
}
