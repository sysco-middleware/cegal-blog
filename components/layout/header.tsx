import Link from "next/link";
import { useState } from "react";
import { HamburgerButton } from "../HamburgerButton";

interface PageItem {
  href: string;
  label: string;
}

export function Header() {
  const pages: PageItem[] = [
    {
      href: "/",
      label: "Blog",
    },
    {
      href: "/video",
      label: "Videos",
    },
    {
      href: "/about",
      label: "About",
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="p-5 lg:p-10">
        <nav className="text-primary mx-auto flex max-w-8xl items-center justify-between">
          <div>
            <Link href={"/"}>
              <a className="text-primary underlined focus:outline-none block whitespace-nowrap text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium transition">
                Curious Programming <span className="hidden sm:inline-block">🤔</span>
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
