import React, { ReactElement } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "../Navigation";

export function PageLayout({ children }: { children: ReactElement }) {
  return (
    <div data-theme="cegal-dark">
      <Header />
      <Navigation />
      <main data-theme="cegal-dark" className="min-h-screen px-6 sm:px-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
