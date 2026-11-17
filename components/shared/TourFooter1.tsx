"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { FooterData } from "@/type";
import Logo from "./Logo";
import SocialIcon from "./SocialIcons";

interface TourFooter1Props {
  data: FooterData;
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0 lg:border-l lg:border-white/18 lg:pl-[clamp(.7rem,1.7vw,1.8rem)]">
      <h2 className="mb-3 font-serif text-xl leading-none font-bold tracking-tight text-white after:mt-2 after:block after:h-[3px] after:w-10 after:rounded-full after:bg-[#eab648]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function FooterLinks({ links }: { links: FooterData["quickLinks"] }) {
  return (
    <ul className="grid gap-[0.35rem]">
      {links.map(({ name, href }) => (
        <li key={name}>
          <a href={href} className="flex items-start gap-1.5 hover:text-[#f1c45d] hover:underline">
            <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-[#f0b742]" aria-hidden="true" strokeWidth={2.4} />
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function TourFooter1({ data }: TourFooter1Props) {
  if (!data) return null;

  const { contact, bottomBar } = data;
  const contactMethods = [
    { label: "Address", value: contact.address, href: contact.mapUrl, icon: MapPin },
    { label: "Call", value: contact.phone, href: `tel:${contact.phone.replace(/[^0-9+]/g, "")}`, icon: Phone },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    { label: "Hours", value: contact.timing, icon: Clock },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#011712] bg-[linear-gradient(180deg,#0a5c48_0%,#053f32_35%,#022a21_65%,transparent_100%)] pt-10 text-[0.83rem] leading-[1.4] text-white shadow-2xl sm:pt-12">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-[3.5%]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-[1.12fr_.88fr] gap-x-5 gap-y-7 pb-5 sm:grid-cols-3 sm:pb-14 lg:grid-cols-[1.28fr_.88fr_.96fr_1.24fr_.83fr] lg:gap-x-[2%] lg:pb-[5.8vw]"
        >
          <div className="col-span-2 sm:col-span-1">
            <a href="#home" aria-label="TripAverde home" className="inline-flex max-w-full">
              <Logo light src={data.logo} className="max-w-full" />
            </a>
            <p className="mt-4 max-w-[18rem] leading-[1.6] text-white/92">
              {data.description}
            </p>
          </div>

          <FooterColumn title="Quick Links">
            <FooterLinks links={data.quickLinks} />
          </FooterColumn>
          <FooterColumn title="Our Services">
            <FooterLinks links={data.services} />
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <ul className="grid gap-2">
              {contactMethods.filter(({ value }) => value).map(({ label, value, href, icon: Icon }) => (
                <li className="flex items-center gap-2.5" key={label}>
                  <span className="grid size-6 shrink-0 place-items-center rounded-[0.35rem] bg-[#eab748] text-[#004638] lg:size-7">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="min-w-0 wrap-anywhere hover:text-[#f1c45d] hover:underline">{value}</a>
                  ) : (
                    <span className="min-w-0 wrap-anywhere">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>

          {!!data.social?.length && (
            <FooterColumn title="Follow Us">
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {data.social.map((site) => (
                  <li key={site.name}>
                    <motion.a
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={site.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={site.name}
                      className="grid size-7 place-items-center rounded-md bg-white text-[#004638] transition-colors hover:bg-[#f1c45d] sm:size-8"
                    >
                      <SocialIcon name={site.icon || site.name} className="size-[1.1rem]" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          )}
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 py-3.5 text-center">
          <p>{bottomBar?.copyright}</p>
          {bottomBar?.links?.map(({ name, href }) => (
            <a key={name} href={href} className="hover:text-[#f1c45d] hover:underline">{name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
