import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useEffect } from "react";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";

import { useAuthStore } from "./store/authUser";
import NotFoundPage from "./pages/NotFoundPage";
import Actorpage from "./pages/Actorpage";
import useScrollToTop from "./hooks/useScrollUpTop";

function App() {
  useScrollToTop(); // This is a custom hook that scrolls to the top of the page when the location changes

  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex h-full items-center justify-center bg-black">
          <Loader className="size-10 animate-spin text-red-600" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/actor/:id"
          element={user ? <Actorpage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
