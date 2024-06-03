"use client";
import FeaturesView from "./components/view/FeaturesView";
import ServicesView from "./components/view/ServicesView";
import Banner from "../common/banner/Banner";
import HeroView from "./components/view/HeroView";

const HomePage = () => {
  return (
    <>
      <HeroView />
      <FeaturesView />
      <ServicesView />
      <Banner />
    </>
  );
};

export default HomePage;
