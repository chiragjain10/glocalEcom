    // src/context/ProductContext.js
import React, { createContext } from 'react';

export const ProductContext = createContext();

const products = [
  {
    id: 1,
    title: 'Handcrafted Terracotta Pot ',
    description:"Handcrafted by Indian artisans",
    price: '₹899',
    rating: 4.8,
    imgs:[
      'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
      
      'https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg',
    ] ,
  },
  {
    id: 2,
    title: 'Terracota Handmade Mask',
    description: 'Painted with cultural motifs',
    price: '₹499',
    rating: 4.5,
    imgs: ['https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg',
      'https://cdn.pixabay.com/photo/2016/09/11/17/36/retro-lampshade-1662061_1280.jpg',
    ]
  },
  {
    id: 3,
    title: 'Terracotta Handmade Mug',
    description: 'Eco-friendly and elegant',
    price: '₹349',
    rating: 4.6,
    imgs: ['https://cdn.dotpe.in/longtail/store-items/5774102/ZfJ7G3jB.webp',
      'https://m.media-amazon.com/images/I/71a+1jseHVL.jpg',
    ]
  },
  {
    id: 4,
    title: 'Artisan Vase',
    description: 'Traditional design and texture',
    price: '₹799',
    rating: 4.7,
    imgs: ['https://cdn.pixabay.com/photo/2019/10/23/09/59/lamp-4571084_1280.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s'
    ]
  },
];

export const ProductProvider = ({ children }) => (
  <ProductContext.Provider value={{ products }}>
    {children}
  </ProductContext.Provider>
);