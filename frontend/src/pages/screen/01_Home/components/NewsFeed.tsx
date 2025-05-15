import { useEffect, useState } from "react";
import { configKeys } from "@/config";
import axios from "axios";

const NewsFeed = () => {
  interface NewsItem {
    title: string;
    link: string;
    snippet: string;
    photo_url: string;
    thumbnail_url: string;
    published_datetime_utc: string;
    authors: string[];
    source_url: string;
    source_name: string;
    source_logo_url?: string;
    source_favicon_url?: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://real-time-news-data.p.rapidapi.com/topic-news-by-section",
        params: {
          topic: "TECHNOLOGY",
          section:
            "CAQiSkNCQVNNUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENJT0NBUWFDZ29JTDIwdk1ETnliSFFxQ2hJSUwyMHZNRE55YkhRb0FBKi4IACoqCAoiJENCQVNGUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENnQVABUAE",
          limit: "500",
          country: "US",
          lang: "en",
        },
        headers: {
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
          "x-rapidapi-key": configKeys.rapidApi,
        },
      });

      setNews(response?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch news.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  console.log({ news });

  return (
    <div className="flex flex-col items-start border border-gray-300 p-4 rounded-xl bg-white/50 h-auto gap-2">
      <h1 className="text-[20px] font-calSans font-[600] text-main">
        What's happening
      </h1>

      {news.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 w-full hover:bg-gray-100 p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <img
            src={item.photo_url}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-left text-sm font-semibold text-main hover:underline">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{item.snippet}</p>
            {item.authors.length > 0 && (
              <p className="text-[10px] text-gray-500 mt-1">
                By {item.authors.join(", ")}
              </p>
            )}
            <div className="flex items-center text-[10px] text-gray-500 mt-1">
              {item.source_logo_url ? (
                <img
                  src={item.source_logo_url}
                  alt={item.source_name}
                  className="w-4 h-4 object-contain mr-1"
                />
              ) : (
                <img
                  src={item.source_favicon_url}
                  alt={item.source_name}
                  className="w-4 h-4 object-contain mr-1"
                />
              )}
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
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}
              </time>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewsFeed;
