import Banner from "./Banner.jsx";
import HomepageCetegories from "./HomepageCetegories.jsx";
import ProductCategories from "./ProductCategories.jsx";
import { categories } from "../components/Navbar.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import TestimonialSlider from "./Testimonials.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import OfferSection from "./OfferSection.jsx";
import Accordion from "./AccordionItems.jsx";
import TrendingProducts from "./TrendingProducts.jsx";
import NewArrival from "./NewArrival.jsx";
import Popup from "./Popup.jsx";


const Homepage = () => {
  return (
    <div>
      <Popup />
      <Banner />
      <ProductCategories />
      <TrendingProducts />
      <HomepageCetegories categories={categories} />
      <NewArrival />
      <FeaturedProducts />
      <WhyChooseUs />
      <OfferSection />
      <TestimonialSlider />
      <Accordion />
    </div>
  );
};

export default Homepage;
