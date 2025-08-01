import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeadphonesAlt, FaGem, FaPaintBrush, FaGopuram,
  FaBookOpen, FaTshirt, FaHome, FaCrown, FaTags, FaChevronRight,
} from "react-icons/fa";

export const categories = [
  {
    title: "Audio Video",
    icon: <FaHeadphonesAlt />,
    subItems: [
      {
        title: "Hindu",
        subSubItems: [
          "Bhajan", "Chanting","Discourses","Ganesha","Gayatri","Goddess","Krishna","Sikh", "Hanuman","Shiva", "Gita", "Puja", "Mantra", "More Hindu"
        ]
      },
      { title: "Indian Classical Music" },
      { title: "folk" },
      { title: "DVDs" },
      { title: "Discourses" },
      { title: "Buddhist" },
      { title: "Children" },
      { title: "Audio Books" },
      { title: "Music Therapy" },
      { title: "Others" },
      { title: "Sufi and Ghazals" },
      { title: "Tantra" },
      { title: "Teach Youself" },
      { title: "Dance" },
      { title: "Culture" },
      { title: "MP3" },
    ]
  },
  {
    title: "Jewelry",
    icon: <FaGem />,
    subItems: [
      { title: "Hindu",
        subSubItems: [
          "Bracelets", "Earrings","Gods","Navratna","Ganesha","Gayatri","Goddess","Krishna","Necklaces","Om","Pendants","Rings","Rosary","Sikh", "Hanuman","Shiva", "Gita", "Puja", "Mantra", "More Hindu"
        ] },
      { title: "pendants",
        subSubItems:[
          "Amber","Amethyst","Carnelian","Calcedony",
        ]
       },
      { title: "Earrings" }
    ]
  },
  {
    title: "Paintings",
    icon: <FaPaintBrush />,
    subItems: [
      { title: "Mughal" },
      { title: "Tanjore" },
      { title: "Miniature" }
    ]
  },
  {
    title: "Statues",
    icon: <FaGopuram />,
    subItems: [
      { title: "Brass" },
      { title: "Stone" },
      { title: "Wood" }
    ]
  },
  {
    title: "Books",
    icon: <FaBookOpen />
  },
  {
    title: "Clothing & More",
    icon: <FaTshirt />,
    subItems: [
      { title: "Men" },
      { title: "Women" },
      { title: "Kids" }
    ]
  },
  {
    title: "Home & Living",
    icon: <FaHome />,
    subItems: [
      { title: "Furniture" },
      { title: "Decor" },
      { title: "Kitchen" }
    ]
  },
  {
    title: "Luxe",
    icon: <FaCrown />
  },
  {
    title: "Best Deals",
    icon: <FaTags />
  }


  
];

const MenuNavigation = () => {
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (main, sub, subsub) => {
    let path = `/categories/${main.toLowerCase()}`;
    if (sub) path += `/${sub.toLowerCase()}`;
    if (subsub) path += `/${subsub.toLowerCase()}`;
    navigate(path);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-4 border-t relative z-50 bg-gray-50 ">
      {categories.map((item, index) => (
        <div key={index} className="relative group cursor-pointer">
          {/* Main category */}
          <div
            onClick={() => handleNavigate(item.title)}
            className="flex items-center space-x-2 hover:text-orange-600 transition-all"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </div>

          {item.subItems && (
            <div
              className="absolute top-full left-0 flex bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              onMouseLeave={() => setHoveredSubItem(null)}
            >
              <div className="py-2 px-4 min-w-[200px]">
                {item.subItems.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    onMouseEnter={() => setHoveredSubItem(sub)}
                    onClick={() => handleNavigate(item.title, sub.title)}
                    className="relative group/item"
                  >
                    <div className="text-sm text-gray-700 hover:text-orange-600 py-1 px-2 whitespace-nowrap flex justify-between items-center">
                      {sub.title || sub}
                      {sub.subSubItems && (
                        <FaChevronRight className="ml-2 text-xs text-gray-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider Right Column - SubSubItems */}
              {hoveredSubItem && hoveredSubItem.subSubItems && (
                <>
                  <div className="border-l border-gray-300"></div>
                  <div className="py-2 px-4 min-w-[200px]">
                    {hoveredSubItem.subSubItems.map((subSub, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleNavigate(item.title, hoveredSubItem.title, subSub)}
                        className="text-sm text-gray-700 hover:text-orange-600 py-1 px-2 whitespace-nowrap cursor-pointer"
                      >
                        {subSub}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuNavigation;
