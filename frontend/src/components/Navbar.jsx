import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";

import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuthStore();

  const { setContentType } = useContentStore();

  const toggleMobile = () => setIsMobile(!isMobile);

  return (
    <header className="mx-auto flex h-20 max-w-6xl flex-wrap items-center justify-between p-4">
      <div className="z-50 flex items-center gap-10">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
            onClick={() => setContentType("movie")}
          />
        </Link>
        {/* Desktop navbar */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}

      <div className="z-50 flex items-center gap-2">
        <Link to={"/search"} className="hover:underline">
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img src={user.image} alt="Avatar" className="h-8 cursor-pointer" />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobile} />
        </div>
      </div>

      {isMobile && (
        <div className="z-50 mt-4 w-full rounded border border-gray-800 bg-black sm:hidden">
          <Link
            to={"/"}
            className="block p-2 hover:underline"
            onClick={() => {
              toggleMobile();
              setContentType("movie");
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block p-2 hover:underline"
            onClick={() => {
              toggleMobile();
              setContentType("tv");
            }}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block p-2 hover:underline"
            onClick={toggleMobile}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
