import { useState } from "react";
import { newsFeed } from "@/json";
import newsPlaceHolder from "@/assets/image/news-image.webp";
// import { configKeys } from "@/config";
// import { UseNews } from "@/hooks/UseNews";

const NewsFeed = () => {
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? newsFeed : newsFeed.slice(0, 2);

  // const { news, loading, error } = UseNews(
  //   "TECHNOLOGY",
  //   configKeys.rapidSectionId
  // );

  return (
    <div className="flex flex-col items-start border border-gray-300 p-4 rounded-xl bg-white/50 h-auto gap-2">
      <h1 className="text-[20px] font-calSans font-[600] text-main">
        What's happening
      </h1>

      {itemsToShow.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 w-full hover:bg-gray-100 p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <img
            src={item.photo_url || newsPlaceHolder}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-left text-sm font-semibold text-main hover:underline">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{item.snippet}</p>
            {item.authors?.length > 0 && (
              <p className="text-[10px] text-gray-500 mt-1">
                By {item.authors.join(", ")}
              </p>
            )}
            <div className="flex items-center text-[10px] text-gray-500 mt-1">
              <img
                src={item.source_logo_url ?? item.source_favicon_url}
                alt={item.source_name}
                className="w-4 h-4 object-contain mr-1"
              />
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer"
              >
                {item.source_name}
              </a>
              <span className="mx-1">·</span>
              <time dateTime={item.published_datetime_utc}>
                {new Date(item.published_datetime_utc).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" }
                )}
              </time>
            </div>
          </div>
        </a>
      ))}

      {newsFeed.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm font-semibold text-primary hover:underline"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default NewsFeed;
