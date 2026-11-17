import React from "react";
import type { TopbarData } from "@/type";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import SocialIcon from "./SocialIcons";

interface TourTopbar1Props {
  data: TopbarData;
}

export default function TourTopbar1({ data }: TourTopbar1Props) {
  if (!data) return null;

  return (
    <div className="bg-[#06332a] text-white/80 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Left Side: Welcome message & timing */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>{data.timing}</span>
          </div>
        </div>

        {/* Right Side: Contact info & Socials */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>{data.phone}</span>
          </a>
          <a
            href={`mailto:${data.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>{data.email}</span>
          </a>

          {/* Social Links */}
          {data.social && data.social.length > 0 && (
            <div className="flex items-center gap-3 pl-2 border-l border-white/15">
              {data.social.map((s, index) => (
                <a
                  key={index}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c29d59] hover:text-white text-white/70 transition-all duration-200"
                >
                  <SocialIcon name={s.icon || s.name} className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
