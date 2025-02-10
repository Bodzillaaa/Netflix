import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatRealeaseDate } from "../utils/dateFunctions";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/get/${contentType}/${id}/trailers`,
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/get/${contentType}/${id}/similar`,
        );
        setSimilarContent(response.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/get/${contentType}/${id}/details`,
        );
        setContent(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  // Slider effect

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <Navbar />
          <div className="mx-auto mt-40 h-full px-4 py-8 text-center">
            <h2 className="text-2xl font-bold text-balance sm:text-5xl">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto h-full px-4 py-8">
        <Navbar />
        {trailers.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <button
              className={`rounded-lg bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500 ${currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`rounded-lg bg-gray-500/70 px-4 py-2 text-white hover:bg-gray-500 ${currentTrailerIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="mb-8 aspect-video p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers.length === 0 && (
            <h2 className="mt-5 text-center text-xl">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {" "}
                {content?.title || content?.name}{" "}
              </span>
            </h2>
          )}
        </div>

        {/* Movie details */}
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-20 md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {" "}
              {content?.title || content?.name}{" "}
            </h2>
            <p className="mt-2 text-lg">
              {formatRealeaseDate(
                content?.release_date || content?.first_air_date,
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600"> 18+ </span>
              ) : (
                <span className="text-green-600"> PG-13 </span>
              )}{" "}
            </p>

            <p className="mt-4"> {content?.overview} </p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* Similar content */}

        {similarContent.length > 0 && (
          <div className="relative mx-auto mt-12 max-w-5xl">
            <h3 className="mb-4 text-3xl font-bold">Similar Movies/Tv Show</h3>

            <div
              className="scrollbar-hide group flex gap-4 overflow-x-scroll pb-4"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="h-auto w-full rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronLeft
                className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:opacity-80"
                onClick={scrollLeft}
              />
              <ChevronRight
                className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:opacity-80"
                onClick={scrollRight}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
