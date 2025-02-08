import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="rounded bg-red-600 px-2 py-1 text-white">
          Sign In
        </Link>
      </header>

      {/* Hero/Sign up Section */}

      <main className="mx-auto flex max-w-6xl flex-col items-center justify-center py-40 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Unlimited movies, TV shows, and more.
        </h1>
        <p className="mb-4 text-lg md:text-2xl">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="mb-4 text-lg md:text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          className="flex w-1/2 flex-col gap-4 md:flex-row"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            className="flex-1 rounded border-gray-700 bg-black/80 p-2"
            placeholder="Email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="flex items-center justify-center rounded bg-red-600 px-2 py-1 text-xl md:py-2 lg:px-6 lg:text-2xl">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </main>
      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden />
      {/* 1st section */}
      <section className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row md:px-2">
          {/* left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
              Enjoy on your TV.
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* right */}
          <div className="relative flex-1">
            <img src="/tv.png" alt="Tv image" className="mt4 relative z-2" />
            <video
              className="absolute top-1/2 left-1/2 z-1 h-1/2 -translate-x-1/2 -translate-y-1/2"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden />
      {/* 2nd section */}
      <section className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center px-4 md:flex-row md:px-2">
          {/* left */}
          <div className="relative flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things img"
                className="mt-4"
              />

              <div className="absolute bottom-5 left-1/2 flex h-24 w-3/4 -translate-x-1/2 items-center gap-2 rounded-md border border-slate-500 bg-black px-2 lg:w-1/2">
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col gap-0">
                    <span className="text-md font-bold lg:text-lg">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>

                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold text-balance md:text-5xl">
              Download your shows to watch offline.
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </section>
      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden />
      {/* 3rd Section   */}
      <section className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row md:px-2">
          {/* left */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
              Watch everywhere.
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* right */}
          <div className="relative flex-1">
            <img
              src="/device-pile.png"
              alt="Device pile image"
              className="mt4 relative z-2"
            />
            <video
              className="absolute top-2 left-1/2 z-1 h-4/6 max-w-[63%] -translate-x-1/2"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden />
      {/* 4th Section */}
      <section className="bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center px-4 md:flex-row md:px-2">
          {/* left */}
          <div className="relative flex-1">
            <div className="relative">
              <img src="/kids.png" alt="kids img" className="mt-4" />
            </div>
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-4xl font-extrabold text-balance md:text-5xl">
              Create profiles for kids.
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default AuthScreen;
