import React from "react";
import RecentPlants from "../components/RecentPlants";
import RecentGallery from "../components/RecentGallery";
import NeedsWater from "../components/health/NeedsWater";
import NeedsRepotted from "../components/health/NeedsRepotted";

const Home = () => {
  return (
      <div className="text-center flex flex-col md:flex-row w-full gap-x-2 gap-y-5 mx-auto">
        <div className="flex flex-col md:flex-row gap-x-5 gap-y-6 mx-auto w-full h-full border p-2 bg-gray-200">
          {/* 3 Recently viewed plants. */}
          <div className="md:flex md:flex-row h-full mx-auto gap-x-5 mt-4">
            <RecentPlants />
            <RecentGallery />
            <NeedsWater />
          </div>
        </div>
      </div>
  );
};

export default Home;
