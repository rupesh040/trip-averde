"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import type { HeaderData } from "@/type";
import Logo from "./Logo";

interface TourHeader1Props {
  data: HeaderData;
}

export default function TourHeader1({ data }: TourHeader1Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(data.links.find((link) => link.active)?.href);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const sectionLinks = data.links.filter((link) => link.href.startsWith("#"));
    const sections = sectionLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    function setActiveFromHash() {
      const matchingLink = data.links.find(
        (link) =>
          link.href === window.location.hash ||
          link.children?.some((child) => child.href === window.location.hash),
      );

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

  function followLink(parentHref: string, targetHref?: string) {
    setActiveHref(parentHref);
    setOpenDropdown(null);
    setMobileMenuOpen(false);

    const destination = targetHref || parentHref;
    if (destination.startsWith("#")) {
      const element = document.getElementById(destination.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function toggleDropdown(href: string) {
    setOpenDropdown((current) => current === href ? null : href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white text-(--tour-green) shadow-[0_1px_0_#0b4d3b14]">
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center gap-5 px-[clamp(1rem,2.65vw,2.5rem)] lg:min-h-[clamp(72px,6.6vw,92px)]">
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
            setOpenDropdown(null);
          }}
          className="ml-auto rounded-lg p-2 hover:bg-emerald-50 lg:hidden"
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="trip-navigation"
          aria-label="Main navigation"
          className={`${mobileMenuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] flex-col overflow-auto border-t border-emerald-950/10 bg-white px-4 py-3 shadow-lg lg:static lg:ml-[clamp(1.25rem,2.4vw,2rem)] lg:flex lg:max-h-none lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none`}
        >
          {data.links.map((link, index) => {
            const active = activeHref === link.href;
            const expanded = openDropdown === link.href;
            const dropdownId = `trip-nav-options-${index}`;

            return (
              <div
                key={link.href}
                className="relative border-b border-emerald-950/8 last:border-0 lg:border-0"
                onBlur={(event) => {
                  if (expanded && !event.currentTarget.contains(event.relatedTarget)) {
                    setOpenDropdown(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (expanded && event.key === "Escape") {
                    event.currentTarget.querySelector("button")?.focus();
                    setOpenDropdown(null);
                  }
                }}
              >
                <div className={`flex items-center justify-between rounded-[10px] transition-colors ${active ? "bg-(--tour-green) text-white" : "hover:bg-emerald-50"}`}>
                  <a
                    href={link.href}
                    aria-current={active ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      followLink(link.href);
                      window.history.pushState(null, "", link.href);
                    }}
                    className={`flex-1 px-3 py-2.5 text-sm font-bold whitespace-nowrap lg:py-1.5 lg:text-[clamp(.83rem,1.27vw,1.06rem)] ${link.hasDropdown && link.children?.length ? "lg:pr-0.5" : ""}`}
                  >
                    {link.name}
                  </a>
                  {link.hasDropdown && !!link.children?.length && (
                    <button
                      type="button"
                      aria-label={`${expanded ? "Hide" : "Show"} ${link.name.toLowerCase()} links`}
                      aria-expanded={expanded}
                      aria-controls={dropdownId}
                      onClick={() => toggleDropdown(link.href)}
                      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg lg:h-9 lg:w-7"
                    >
                    </button>
                  )}
                </div>
                {link.hasDropdown && !!link.children?.length && (
                  <ul
                    id={dropdownId}
                    hidden={!expanded}
                    className="space-y-0.5 py-1 pl-5 lg:absolute lg:top-full lg:left-0 lg:min-w-48 lg:rounded-xl lg:border lg:border-emerald-950/10 lg:bg-white lg:p-1.5 lg:shadow-xl lg:z-50"
                  >
                    {link.children.map((child) => (
                      <li key={child.name}>
                        <a
                          href={child.href}
                          onClick={(e) => {
                            e.preventDefault();
                            followLink(link.href, child.href);
                            window.history.pushState(null, "", child.href);
                          }}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-(--tour-green) transition-colors hover:bg-emerald-50 hover:text-(--tour-deep)"
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <span aria-hidden="true" className="hidden h-7 w-px shrink-0 bg-(--tour-green)/65 lg:block" />
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
    </header>
  );
}
