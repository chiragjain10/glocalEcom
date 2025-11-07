import React from 'react';

const News = () => {
  const posts = [
    {
      title: 'Glocalship raises Series A to scale artisan networks',
      date: 'Jan 18, 2025',
      tag: 'Announcement',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Sustainability report 2024: Our path to carbon‑neutral ops',
      date: 'Dec 10, 2024',
      tag: 'Report',
      image: 'https://images.unsplash.com/photo-1497339100210-9e87df79c218?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Partnering with 500+ creators worldwide',
      date: 'Nov 05, 2024',
      tag: 'Partnerships',
      image: 'https://images.unsplash.com/photo-1518609571773-39b7d303a86c?q=80&w=1600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">Newsroom</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Company announcements, press releases, and stories from our community.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, idx) => (
            <article key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[16/10]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs rounded-full bg-white/90 text-amber-700 border border-amber-200">{p.tag}</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-500">{p.date}</div>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">{p.title}</h3>
                <button className="mt-4 h-10 px-4 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50">Read more</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;


