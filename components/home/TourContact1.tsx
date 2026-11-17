"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail, MessageSquare, Phone, Send, Tag, UserRound } from "lucide-react";
import type { ContactData } from "@/type";

interface TourContact1Props {
  data: ContactData;
}

const fields = [
  { name: "name", type: "text", label: "Your Name", autoComplete: "name", icon: UserRound },
  { name: "email", type: "email", label: "Your Email", autoComplete: "email", icon: Mail },
  { name: "phone", type: "tel", label: "Your Number", autoComplete: "tel", icon: Phone },
  { name: "subject", type: "text", label: "Subject", autoComplete: "off", icon: Tag },
];

const inputClass = "w-full rounded-[0.55rem] border border-[#dbdfda] bg-white py-2.5 pr-3 pl-11 text-base text-[#24332e] placeholder:text-[#5c666d] focus:border-[var(--tour-green)] focus:outline-2 focus:outline-[var(--tour-green)] sm:text-sm";

export default function TourContact1({ data }: TourContact1Props) {
  const [draftLink, setDraftLink] = useState("");

  if (!data) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = String(formData.get("subject") ?? "").trim();
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone")}`,
      "",
      String(formData.get("message") ?? "").trim(),
    ].join("\r\n");
    const link = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraftLink(link);
    window.location.href = link;
  };

  return (
    <section id="contact" className={`relative isolate scroll-mt-24 overflow-hidden bg-white pt-12 sm:pt-16 lg:pt-[5.5vw] ${data.image ? "pb-28 md:pb-16 lg:pb-[5.5vw]" : "pb-12 sm:pb-16 lg:pb-[5.5vw]"}`}>
      {data.image && (
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 -z-10 h-36 w-full md:h-[65%] md:w-[68%]">
          <Image src={data.image} alt="" fill sizes="(min-width: 768px) 75vw, 100vw" className="object-cover object-left-bottom" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,#fff9_24%,transparent_77%)] md:bg-[linear-gradient(180deg,#fff_0%,#fff9_24%,transparent_77%),linear-gradient(90deg,transparent_60%,white_100%)]" />
        </div>
      )}

      <div className="mx-auto grid max-w-[1400px] items-start gap-8 px-6 sm:px-[4%] md:grid-cols-[0.91fr_1.09fr] md:gap-[5%]">
        <div className="min-w-0 lg:pl-[17%]">
          <div className="mb-2 flex items-center gap-3 text-xs font-bold tracking-[0.13em] text-[var(--tour-green)] uppercase sm:text-sm">
            <span className="h-px w-9 bg-[var(--tour-gold)]" aria-hidden="true" />
            {data.cursiveText || "Contact Us"}
            <span className="h-px w-9 bg-[var(--tour-gold)]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.7vw,3.6rem)] leading-[1.08] font-bold tracking-[-0.035em] text-[var(--tour-green)]">
            {data.headingPart1 || "Get in Touch"}{" "}
            <span className="text-[var(--tour-gold)]">{data.headingPart2 || "With Us"}</span>
          </h2>
          <p className="mt-3 max-w-[32rem] text-sm leading-[1.55] text-[#424a4a] sm:text-base">
            {data.description}
          </p>

        </div>

        <div className="min-w-0 overflow-hidden rounded-[1.35rem] bg-[linear-gradient(135deg,#075743_0%,#043e30_60%,#022c22_100%)] shadow-[0_12px_36px_#022c2240] ring-1 ring-white/10">
          <h3 className="flex items-center justify-center gap-3 px-4 py-4 text-center text-lg font-extrabold text-white sm:py-[1.15rem] sm:text-[1.35rem]">
            <Send className="size-6 shrink-0 sm:size-7" aria-hidden="true" strokeWidth={1.65} />
            {data.formTitle || "Send Us a Message"}
          </h3>
          <form onSubmit={submit} onChange={() => setDraftLink("")} className="grid gap-3 rounded-[1.3rem] border border-[#dfbc71] bg-[#faf7ef] p-4 sm:gap-4 sm:p-6">
            {data.formSubtitle && <p className="text-sm text-[#424a4a]">{data.formSubtitle}</p>}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {fields.map(({ name, type, label, autoComplete, icon: Icon }) => (
                <label key={name} className="relative min-w-0">
                  <span className="sr-only">{label}</span>
                  <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-[1.1rem] -translate-y-1/2 text-[#475350]" aria-hidden="true" strokeWidth={1.75} />
                  <input name={name} type={type} placeholder={`${label} *`} autoComplete={autoComplete} required className={inputClass} />
                </label>
              ))}
            </div>

            <label className="relative">
              <span className="sr-only">Message</span>
              <MessageSquare className="pointer-events-none absolute top-3.5 left-3.5 size-[1.1rem] text-[#475350]" aria-hidden="true" strokeWidth={1.75} />
              <textarea name="message" rows={4} placeholder="Message *" required className={`block min-h-28 resize-y ${inputClass}`} />
            </label>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button type="submit" className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-[#996719] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--tour-green)] sm:px-5 sm:py-3">
                <Send className="size-[1.15rem]" aria-hidden="true" strokeWidth={1.7} />
                {data.buttonText || "Send Message"}
              </button>
              <span className="text-xs text-[#5c6662]">Opens your email app.</span>
            </div>
            <div role="status" className={draftLink ? "text-sm text-[var(--tour-green)]" : "sr-only"}>
              {draftLink && (
                <>
                  Send the draft in your email app.{" "}
                  <a href={draftLink} className="font-bold underline">Open draft again</a>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
