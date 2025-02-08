import { Link } from "react-router-dom";
import { useState } from "react";
import { Info, Play } from "lucide-react";

import Navbar from "../../components/Navbar";
import ContentSlider from "../../components/ContentSlider";

import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { useContentStore } from "../../store/content";

import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent)
    return (
      <div className="relative h-screen text-white">
        <Navbar />
        <div className="shimmer absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-center bg-black/70" />
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {/* Some UI optimisation */}
        {imgLoading && (
          <div className="shimmer absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-center bg-black/70" />
        )}

        <img
          src={`${ORIGINAL_IMG_BASE_URL}${trendingContent?.backdrop_path}`}
          alt="Hero Image"
          className="absolute top-0 left-0 -z-50 h-full w-full object-cover"
          onLoad={() => {
            setImgLoading(false);
          }}
        />

        <div
          className="absolute top-0 left-0 -z-50 h-full w-full bg-black/50"
          aria-hidden
        />

        <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-b from-black via-transparent to-transparent" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              || {trendingContent?.adult ? "18+" : "PG 13"}
              {}
            </p>

            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="mt-8 flex">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="mr-4 flex items-center rounded bg-white px-4 py-2 text-black hover:bg-white/60"
            >
              <Play className="mr-2 size-6 fill-black" />
              play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center rounded bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500"
            >
              <Info className="mr-2 size-6" />
              More info
            </Link>
          </div>
        </div>
      </div>
      {/* 2nd section */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
