import React from "react";
import NewsCard from "./NewsCard";

const sampleNews = {
  title: "Nigeria crime journalist wounded in Toll gate shooting",
  imgSrc: "/images/shooting.jpg", // Replace with real asset
  time: "2 hours ago",
  author: "Amy Adams",
};

const TrendingSection = () => {
  return (
    <div className="mt-6 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Trending News</h2>
        <button className="text-green-600 text-sm">See All</button>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide">
        {[1, 2].map((i) => (
          <NewsCard key={i} {...sampleNews} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
