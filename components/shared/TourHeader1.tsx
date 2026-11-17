"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import type { HeaderData } from "@/type";
import Logo from "./Logo";

interface TourHeader1Props {
  data: HeaderData;
}

export default function TourHeader1({ data }: TourHeader1Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(data.links.find((link) => link.active)?.href);

  useEffect(() => {
    const sectionLinks = data.links.filter((link) => link.href.startsWith("#"));
    const sections = sectionLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    function setActiveFromHash() {
      const matchingLink = data.links.find((link) => link.href === window.location.hash);
      if (matchingLink) {
        setActiveHref(matchingLink.href);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
          setActiveHref("#" + visibleSection.target.id);
        }
      },
      { rootMargin: "-22% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    setActiveFromHash();
    window.addEventListener("hashchange", setActiveFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setActiveFromHash);
    };
  }, [data.links]);

  function followLink(href: string) {
    setActiveHref(href);
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  const { scrollYProgress } = useScroll();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-white text-(--tour-green) shadow-[0_1px_0_#0b4d3b14]"
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 inset-x-0 h-[2.5px] bg-[linear-gradient(90deg,#e6b24b_0%,#bc8125_50%,#0b4d3b_100%)] origin-left z-50 pointer-events-none"
      />
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-6 px-[clamp(1rem,2.65vw,2.5rem)] lg:min-h-[clamp(72px,6.6vw,92px)]">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            followLink("#home");
            window.history.pushState(null, "", "#home");
          }}
          className="shrink-0"
        >
          <Logo src={data.logo || undefined} />
        </a>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="trip-navigation"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="ml-auto rounded-lg p-2 hover:bg-emerald-50 lg:hidden"
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="trip-navigation"
          aria-label="Main navigation"
          className={`${mobileMenuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] flex-col overflow-auto border-t border-emerald-950/10 bg-white px-4 py-3 shadow-lg lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-1.5 xl:gap-3 lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none`}
        >
          {data.links.map((link) => {
            const active = activeHref === link.href;

            return (
              <div
                key={link.href}
                className="border-b border-emerald-950/8 last:border-0 lg:border-0"
              >
                <div className={`rounded-[10px] transition-colors ${active ? "bg-(--tour-green) text-white" : "hover:bg-emerald-50"}`}>
                  <a
                    href={link.href}
                    aria-current={active ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      followLink(link.href);
                      window.history.pushState(null, "", link.href);
                    }}
                    className="block px-3 py-2.5 text-sm font-bold whitespace-nowrap lg:py-1.5 lg:text-[clamp(.83rem,1.27vw,1.06rem)]"
                  >
                    {link.name}
                  </a>
                </div>
              </div>
            );
          })}

          {data.button && (
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                followLink("#contact");
                window.history.pushState(null, "", "#contact");
              }}
              className="rounded-[10px] bg-(--tour-gold) px-3 py-2 text-sm font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
            >
              {data.button}
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`} className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold lg:hidden">
              <PhoneCall aria-hidden="true" className="size-4 text-(--tour-gold)" />
              {data.phone}
            </a>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
