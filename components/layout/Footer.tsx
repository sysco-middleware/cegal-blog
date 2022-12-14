export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-5 items-center justify-center border-t-2 border-cegal-green p-5 text-center ">
      <p>© {year} - CEGAL</p>
      <a
        href="https://cegal-blog.sanity.studio/desk/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sanity Studio
      </a>
    </footer>
  );
}
