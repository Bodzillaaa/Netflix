import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import BiographyModal from "../components/BiographyModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Actorpage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState({});
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  const { setContentType } = useContentStore();
  const sliderRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/get/person/${id}/details`);
        setActor(response.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setActor(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  useEffect(() => {
    const fetchActorContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/search/person/${actor?.name}`,
        );
        setContent(response.data.content[0].known_for);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      }
    };

    fetchActorContent();
  }, [actor]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto h-full px-4 py-8">
          <Navbar />
          <h1 className="mt-5 text-center text-4xl font-bold">
            Actor not found!
          </h1>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto h-full px-4 py-8">
        <Navbar />
        {/* Actor details */}
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-20 md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">{actor?.name}</h2>
            <div>
              <p className="text-md mt-5 text-gray-400">
                {actor?.biography.length > 300
                  ? `${actor?.biography.substring(0, 300)}...`
                  : actor?.biography}
              </p>
              {actor?.biography.length > 300 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Read More
                </button>
              )}

              {/* Biography Modal */}
              <BiographyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                biography={actor?.biography}
              />
            </div>

            <p className="mt-4">
              Born in{" "}
              <span className="text-gray-400">{actor?.place_of_birth}</span>
            </p>
            {actor?.homepage && (
              <p className="mt-4">
                Personal homepage {"> "}
                <a
                  href={actor?.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:text-amber-200"
                >
                  {actor?.homepage}
                </a>
              </p>
            )}
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + actor?.profile_path}
            alt={`${actor?.name} image`}
            className="max-h-[600px] rounded-md"
          />
        </div>
        {/* Actor content */}
        {content?.length > 0 && (
          <div className="relative mx-auto mt-12 max-w-5xl">
            <h3 className="mb-4 text-3xl font-bold">Movies / Shows</h3>

            <div
              className="scrollbar-hide group flex gap-4 overflow-x-scroll pb-4"
              ref={sliderRef}
            >
              {content?.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                    onClick={() => setContentType(content.media_type)}
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

export default Actorpage;
