import React, { useState, useEffect } from 'react';
import { categories } from './HomePagemain/MenuNavigation';

const CategoryLayout = () => {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const firstWithSub = categories.find(cat => Array.isArray(cat.subItems) && cat.subItems.length > 0);
    if (firstWithSub) {
      setSelectedMain(firstWithSub);
      const firstSub = firstWithSub.subItems.find(sub => Array.isArray(sub.subSubItems) && sub.subSubItems.length > 0);
      if (firstSub) setSelectedSub(firstSub);
    }
  }, []);

  const handleMainClick = (cat) => {
    setSelectedMain(cat);
    const firstSub = cat.subItems?.find(sub => Array.isArray(sub.subSubItems) && sub.subSubItems.length > 0);
    if (firstSub) setSelectedSub(firstSub);
    else setSelectedSub(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleMainClick(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedMain?.title === cat.title
                ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Subcategory + Sub-subcategory Section */}
      {selectedMain?.subItems && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar: Subcategories */}
          <aside className="lg:w-1/4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">Subcategories</h3>
            <ul className="space-y-2">
              {selectedMain.subItems.map((sub, idx) => (
                <li
                  key={idx}
                  onClick={() => setSelectedSub(sub)}
                  className={`cursor-pointer px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSub?.title === sub.title
                      ? 'bg-gradient-to-r from-black to-gray-700 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {sub.title || `Subcategory ${idx + 1}`}
                </li>
              ))}
            </ul>
          </aside>

          {/* Content: Sub-subcategory items */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
                {selectedSub?.title || 'Browse Items'}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedSub?.subSubItems?.length > 0 ? (
                  selectedSub.subSubItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white p-3 rounded-lg border border-gray-200 hover:border-amber-300 transition-all duration-200 hover:shadow-md text-center cursor-pointer"
                    >
                      <div className="bg-gray-100 rounded-md aspect-square mb-3 overflow-hidden">
                        {/* Placeholder for item image */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">{item}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try selecting a different subcategory</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default CategoryLayout;