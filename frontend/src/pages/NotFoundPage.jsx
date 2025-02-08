import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/404.png)" }}
    >
      <header className="absolute top-0 left-0 w-full bg-black p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix logo" className="h-8" />
        </Link>
      </header>
      <main className="error-page--content z-10 text-center">
        <h1 className="mb-4 text-7xl font-semibold">Lost you way?</h1>
        <p className="mb-6 text-xl">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore
          on the home page.
        </p>
        <Link to={"/"} className="rounded bg-white px-4 py-2 text-black">
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
