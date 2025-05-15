import { useEffect, useState } from "react";
import axios from "axios";
import { configKeys } from "@/config";

export interface NewsItem {
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

export function UseNews(topic = "TECHNOLOGY", sectionId = "") {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://real-time-news-data.p.rapidapi.com/topic-news-by-section",
          {
            params: {
              topic,
              section: sectionId,
              limit: "500",
              country: "US",
              lang: "en",
            },
            headers: {
              "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
              "x-rapidapi-key": configKeys.rapidApi,
            },
          }
        );
        setNews(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [topic, sectionId]);

  return { news, loading, error };
}
