const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black py-6 text-white md:px-8 md:py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          Built by{" "}
          <a
            href="#"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Bodruddoza Araf.{" "}
          </a>
          The source code is here...{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
