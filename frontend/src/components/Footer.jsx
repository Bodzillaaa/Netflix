const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black py-6 text-gray-500 md:px-8 md:py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/bodruddoza-araf-5989a22b7/"
            target="_blank"
            className="font-medium text-gray-400 underline underline-offset-4 hover:text-gray-300"
          >
            Bodruddoza Araf
          </a>
          . For the source code {">"}{" "}
          <a
            href="https://github.com/Bodzillaa"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-400 underline underline-offset-4 hover:text-gray-300"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
