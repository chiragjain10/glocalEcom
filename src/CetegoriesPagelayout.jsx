import React, { useState, useEffect } from 'react';
import { categories } from './HomePagemain/MenuNavigation';

const CategoryLayout = () => {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [expandedSub, setExpandedSub] = useState(null);

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
    setExpandedSub(null);
  };

  const toggleSubItems = (sub) => {
    if (expandedSub === sub.title) {
      setExpandedSub(null);
    } else {
      setExpandedSub(sub.title);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans mt-19">
      {/* Main Categories - Centered with new gradient */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleMainClick(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedMain?.title === cat.title
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md hover:shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory + Sub-subcategory Section */}
      {selectedMain?.subItems && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* Sidebar: Subcategories - Narrower width */}
          <aside className="lg:w-56 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 pb-2 border-b border-gray-100">Subcategories</h3>
            <ul className="space-y-1">
              {selectedMain.subItems.map((sub, idx) => (
                <li key={idx}>
                  <div
                    onClick={() => {
                      setSelectedSub(sub);
                      toggleSubItems(sub);
                    }}
                    className={`cursor-pointer px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex justify-between items-center ${
                      selectedSub?.title === sub.title
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    <span>{sub.title || `Subcategory ${idx + 1}`}</span>
                    {sub.subSubItems?.length > 0 && (
                      <svg
                        className={`w-4 h-4 transition-transform ${expandedSub === sub.title ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Dropdown for sub-sub items */}
                  {expandedSub === sub.title && sub.subSubItems?.length > 0 && (
                    <ul className="pl-3 mt-1 space-y-1">
                      {sub.subSubItems.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="px-3 py-1.5 text-xs rounded-md bg-gray-50 text-gray-600 hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Content: Selected Subcategory items */}
          <main className="flex-1">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
                {selectedSub?.title || 'Browse Items'}
              </h2>
              
              {/* Enhanced Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {selectedSub?.subSubItems?.length > 0 ? (
                  selectedSub.subSubItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 transition-all duration-200 hover:shadow-lg overflow-hidden cursor-pointer"
                    >
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg aspect-square mb-3 overflow-hidden">
                        {/* Placeholder for item image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {/* Badge */}
                        <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors mb-1">
                          {item}
                        </h3>
                        <p className="text-xs text-gray-500">Category: {selectedSub.title}</p>
                        <div className="mt-2 text-amber-600 font-semibold text-sm">
                          $29.99
                        </div>
                      </div>
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