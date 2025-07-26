import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Banner from './Banner.jsx'
import ProductCategories from './ProductCategories.jsx'
import FeaturedProducts from './FeaturedProducts.jsx'
import TestimonialSlider from './Testimonials.jsx'
import MenuNavigation from './MenuNavigation.jsx'

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <MenuNavigation/>
      <Banner/>
      <ProductCategories />
      <FeaturedProducts />
      <TestimonialSlider />
      <Footer />
    </div>
  )
}

export default Homepage
