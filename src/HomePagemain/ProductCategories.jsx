import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Pagination removed
import { Link } from 'react-router-dom';
import 'swiper/css';

const categories = [
  {
    name: 'Marble Statues',
    image: 'https://cdn.pixabay.com/photo/2020/02/24/07/06/viet-nam-4875404_1280.jpg',
  },
  {
    name: 'Bronze Sculptures',
    image: 'https://cdn.pixabay.com/photo/2013/10/22/19/54/buddha-199462_1280.jpg',
  },
  {
    name: 'Traditional Paintings',
    image: 'https://cdn.pixabay.com/photo/2017/12/09/15/19/artist-3008031_1280.jpg',
  },
  {
    name: 'Handmade Jewelry',
    image: 'https://cdn.pixabay.com/photo/2018/10/08/07/52/accessories-3732140_1280.jpg',
  },
  {
    name: 'Spiritual Decor',
    image: 'https://cdn.pixabay.com/photo/2019/03/19/09/58/dreamcatcher-4065288_1280.jpg',
  },
  {
    name: 'Home & Living',
    image: 'https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg',
  },
];

const ProductCategories = () => {
  return (
    <section className="py-10 px-4 md:px-10 bg-gray-50">
      <div className="mb-6 text-center slider-heading-row">
        <div className="slider-icon text-white text-2xl">✧</div>
        <h2 className="slider-heading ">
          Explore Our Categories
        </h2>
      </div>
      
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="custom-swiper px-4 mt-5 pb-14" // 👈 more bottom padding
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Autoplay]} // Removed Pagination module
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.02] group">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 w-full py-4 px-4 text-center">
                <h3 className="text-lg font-semibold italic text-white drop-shadow-lg">{cat.name}</h3>
                <div className="flex justify-center mt-4">
                  <Link 
                    to="/all-categories" 
                    className="relative inline-flex items-center gap-1 text-white bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 rounded-md text-sm font-bold transition-all duration-300 hover:shadow-md hover:from-amber-500 hover:to-amber-600"
                  >
                    <span>Shop</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCategories;
