import Image from "next/image";

interface LogoProps {
  className?: string;
  light?: boolean;
  src?: string;
}

export default function Logo({ className = "", light = false, src }: LogoProps) {
  const color = light ? "text-white" : "text-(--tour-green)";
  const accent = light ? "text-[#e6b24b]" : "text-(--tour-gold)";

  if (src) {
    return (
      <Image
        src={src}
        alt="TripAverde"
        width={light ? 280 : 275}
        height={light ? 92 : 72}
        className={`h-auto w-[clamp(10.75rem,20vw,16.75rem)] object-contain ${className}`}
        style={{ height: "auto" }}
        unoptimized
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${className}`}>
      <span
        aria-hidden="true"
        className={`rounded-full border-l-2 border-current px-1 font-serif text-3xl font-bold italic ${accent}`}
      >
        TA
      </span>
      <span className={`text-2xl font-extrabold italic tracking-tight sm:text-3xl ${color}`}>
        Trip<span className={accent}>Averde</span>
      </span>
    </span>
  );
}
