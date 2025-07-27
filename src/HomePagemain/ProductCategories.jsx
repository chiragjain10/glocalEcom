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
    <section className="py-10 px-4 md:px-10 font-['Inter']">
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
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Autoplay, Pagination]}
        className="px-4"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.02]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center text-center px-4">
                <p className="text-sm text-gray-200 mb-1">Explore</p>
                <h3 className="text-lg font-semibold italic">{cat.name}</h3>
                <button className="mt-3 bg-yellow-100 text-black px-4 py-[2px] rounded-full text-sm font-medium w-fit hover:bg-yellow-200 transition">
                  Shop →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCategories;
