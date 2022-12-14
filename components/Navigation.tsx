import Link from "next/link";
import { useRouter } from "next/router";
import { NavBar } from "@cegal/ui-components";

export const Navigation = () => {
  const { asPath } = useRouter();

  const isAtBlog = asPath.includes("/blog") || asPath === "/" ? 0 : -1;

  return (
    <NavBar className="px-6 pb-4 text-lg sm:px-14" value={isAtBlog}>
      <NavBar.Link as={Link} variant="secondary" href="/blog">
        Blog
      </NavBar.Link>
    </NavBar>
  );
};
