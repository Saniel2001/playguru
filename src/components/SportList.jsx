"use client"
import React, { useState, useEffect } from "react";

const SportList = () => {
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=044110040a0941c1287b9f552ca5409f`);
        const data = await response.json();
        setSportsData(data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchUnsplashImage = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=oPTt8SrghDrA2bg1tM2JF1Gm9OaWXWjGJLgI3B9Rl5c&query=${encodedQuery}`);
      const data = await response.json();
      console.log("Unsplash API response:", data);
      if (data.results.length > 0) {
        const fullImageUrl = data.results[0]?.urls.full;
        console.log("Full image URL:", fullImageUrl);
        return fullImageUrl;
      } else {
        console.error("No images found for the query:", query);
        return null;
      }
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      return null;
    }
  };
  
  const replaceImage = async (sport) => {
    try {
      const imageUrl = await fetchUnsplashImage(sport.title);
      console.log("Image URL:", imageUrl);
      const updatedSportsData = sportsData.map(item => {
        if (item.title === sport.title) {
          return { ...item, imageUrl };
        }
        return item;
      });
      console.log("Updated sports data:", updatedSportsData);
      setSportsData(updatedSportsData);
    } catch (error) {
      console.error("Error replacing image:", error);
    }
  };
  

  return (
    <div className="px-32 bg-gray-900 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {sportsData.map((sport) => (
        <div key={sport.key} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="px-4 pt-4">
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg border border-blue-700"
              src={sport.imageUrl || "/game.png"} // Default or fetched image
              alt={sport.title}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {sport.title}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {sport.description}
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href={`/predict/${sport.key}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Predict
              </a>
              <a
                href="#"
                className={`py-2 px-4 ms-2 text-sm font-medium focus:outline-none bg-white rounded-lg border dark:bg-gray-800 
                ${
                  sport.active ? "dark:text-green-700 border-green-700" : "dark:text-red-700 border-red-700"
                }`}
              >
                {sport.active ? "Active" : "Offline"}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportList;
