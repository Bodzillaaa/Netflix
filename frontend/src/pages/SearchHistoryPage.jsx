import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
};

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to delete item from history");
    }
  };

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get("/api/v1/search/history");
        setSearchHistory(response.data.content);
      } catch (error) {
        console.log(error.message);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  if (searchHistory?.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Search history </h1>
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Search history </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start rounded bg-gray-800 p-4"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="mr-4 size-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg text-white"> {entry.title} </span>
                <span className="text-sm text-gray-400">
                  {formatDate(entry.createdAt)}
                </span>
              </div>

              <span
                className={`ml-auto min-w-20 rounded-full px-3 py-1 text-center text-sm ${entry.searchType === "movie" ? "bg-red-600" : entry.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="ml-4 size-5 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
