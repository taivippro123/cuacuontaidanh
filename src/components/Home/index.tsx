import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import AllProducts from "./AllProducts";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <AllProducts />
      <Newsletter />
    </main>
  );
};

export default Home;
