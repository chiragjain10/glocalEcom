// ProductCategories.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
    <section className="py-10 px-4 md:px-10 font-['Inter'] bg-[#f4f2e9]">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Explore our thoughtful and planet-first ✧ <em className="italic">Categories</em>
        </h2>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="custom-swiper px-4 mt-5 pb-10"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Autoplay, Pagination]}
      >

        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.02]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay moved to bottom */}
              <div className="absolute bottom-0 w-full bg-black/50 py-4 px-4 text-center">
                <p className="text-sm text-gray-200">Explore</p>
                <h3 className="text-lg font-semibold italic text-white">{cat.name}</h3>

                <div className="flex justify-center mt-4">
                  <button className="relative text-center overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-black px-4 py-[4px] rounded-md text-sm font-medium flex items-center gap-1 group transition-all duration-500 ease-in-out hover:from-yellow-400 hover:to-orange-500 hover:shadow-md">
                    <span className="relative z-10">Shop</span>
                    <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>

                    {/* Glow layer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 rounded-md"></span>
                  </button>
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
