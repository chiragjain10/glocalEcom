import React from 'react';
import { Link } from 'react-router-dom';

const HomepageCetegories = ({ categories = [] }) => {
  return (
    <div className="w-full bg-gray-50">
      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="mb-6 text-center">
          <h2 className="slider-heading mb-4">Shop by Category</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full shadow-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/all-categories/${encodeURIComponent(cat.title.toLowerCase())}`}
              className="group no-underline"
            >
              <div className="h-[110px] rounded-2xl bg-white shadow-sm border border-gray-200/60 hover:border-amber-300 hover:shadow-xl transition-all duration-300 p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full grid place-items-center border border-amber-300/60 bg-amber-50/60 text-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold">{cat.title}</span>
                  <span className="text-xs text-gray-500 mt-1 group-hover:text-amber-600 transition-colors">Explore {cat.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomepageCetegories;

