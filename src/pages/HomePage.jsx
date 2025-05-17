import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopTabs from "../components/TopTab";
import FeaturedArticle from "../components/FeaturedArticle";
import TrendingSection from "../components/TrendingSection";
import BottomNavbar from "../components/BottomNavbar";
import NewsCard from "../components/NewsCard"; // ✅ Import the NewsCard
import { fetchPosts } from "../utils/postAPI";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Dummy news data for rendering cards
const defaultPosts = [
  {
    title: "Mrs Precillia Otti",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQFE-jFAHofNcb_eCqFkzMqn_f7rCPsXcgEg&s",
    time: "1 hour ago",
    author: "Jane Doe",
  },
  {
    title: "Favour Abia, says Ikpeazu",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtZlcvEC0YY_ZmgH_pCnTzvNiJx5cFJuVKA&s",
    time: "2 hours ago",
    author: "John Smith",
  },
  {
    title: "Abia governor swears in 16 local government",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhhhplj8YeWdrElNT8RPBH58pwsJuNNT4SQ&s",
    time: "3 hours ago",
    author: "Fatima Balogun",
  },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const posts = fetchPosts();
    setNewsList(posts.length ? posts : defaultPosts);
  }, []);

  return (
    <motion.div
      className="bg-white min-h-screen flex flex-col justify-between"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <TopTabs onTabChange={setActiveTab} />
        <FeaturedArticle />
        <TrendingSection />

        {/* ✅ Conditional rendering based on tab */}
        {activeTab === "feed" && (
          <div className="px-4 mt-6">
            <h2 className="text-md font-semibold mb-2 text-gray-800">
              Recent News
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {newsList.map((news, index) => (
                <NewsCard
                  key={index}
                  index={index}
                  title={news.title}
                  imgSrc={news.imgSrc}
                  time={news.time}
                  author={news.author}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "your-post" && (
          <div className="px-4 mt-6 text-gray-600 text-center">
            <p>You haven’t posted anything yet. Create a new post!</p>
          </div>
        )}
      </div>

      <BottomNavbar />
    </motion.div>
  );
};

export default HomePage;
