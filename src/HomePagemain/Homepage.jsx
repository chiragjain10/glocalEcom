
import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Banner from "./Banner.jsx";
import ProductCategories from "./ProductCategories.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import TestimonialSlider from "./Testimonials.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import OfferSection from "./OfferSection.jsx";
import Accordion from "./AccordionItems.jsx";
import TrendingProducts from "./TrendingProducts.jsx";
import NewArrival from "./NewArrival.jsx";


const Homepage = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <ProductCategories />
      <TrendingProducts />
      <NewArrival />
      <FeaturedProducts />
      <OfferSection />
      <TestimonialSlider />
      <Accordion />
    </div>
  );
};

export default Homepage;
