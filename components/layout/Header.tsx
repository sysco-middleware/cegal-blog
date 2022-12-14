import Link from "next/link";
import Image from "next/image";
import LogoSvgCegalWhite from "public/CegalWhite.svg";

export function Header() {
  return (
    <header className="sm:h-30 relative flex h-20 border-b border-cegal-green px-6 sm:px-14">
      <div className="text-primary max-w-8xl relative z-10 mx-auto flex w-full items-center justify-between">
        <Link
          href="/"
          className="text-primary block whitespace-nowrap text-xl font-medium transition focus:outline-none"
        >
          <LogoSvgCegalWhite height={30} />
        </Link>
      </div>

      <Image
        alt="cegal-waves"
        fill
        quality={100}
        src="/header-bg.png"
        style={{
          maxWidth: "60%",
          objectFit: "cover",
          right: "0",
          left: "auto",
        }}
        priority
        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
      />
    </header>
  );
}
