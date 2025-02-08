import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useContentStore } from "../store/content";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  const formatedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formatedContentType = contentType === "movie" ? "movies" : "tv-shows";

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(
        `/api/v1/get/${contentType}/${category}`,
      );
      setContent(response.data.content);
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      className="relative bg-black px-5 text-white md:px-20"
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formatedCategoryName} {formatedContentType}
      </h2>

      <div
        className="scrollbar-hide flex space-x-4 overflow-x-scroll"
        ref={sliderRef}
      >
        {content.map((item) => {
          if (!item.backdrop_path) return null;
          return (
            <Link
              to={`/watch/${item.id}`}
              className="group relative min-w-[250px]"
              key={item.id}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="Movie image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">{item.title || item.name}</p>
            </Link>
          );
        })}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 left-5 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white opacity-50 hover:opacity-80 md:left-24"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 right-5 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white opacity-50 hover:opacity-80 md:right-24"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
