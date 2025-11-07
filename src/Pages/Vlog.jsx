import React from 'react';

const Vlog = () => {
  const videos = [
    { id: '1', title: 'Inside the Artisan Studio', duration: '6:24', thumb: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop' },
    { id: '2', title: 'From Clay to Craft', duration: '8:10', thumb: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop' },
    { id: '3', title: 'Weaving Traditions', duration: '5:02', thumb: 'https://images.unsplash.com/photo-1512529939-66f8318d8ba3?q=80&w=1600&auto=format&fit=crop' },
    { id: '4', title: 'Packaging With Care', duration: '4:45', thumb: 'https://images.unsplash.com/photo-1542838686-73cfcf07c4c6?q=80&w=1600&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">Vlog & Behind the Scenes</h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Stories from our creators, process deep dives, and product spotlights.</p>
          </div>
        </div>
      </section>

      {/* Featured video */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="aspect-video rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Featured video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((v) => (
            <div key={v.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative aspect-video overflow-hidden">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs rounded bg-black/70 text-white">{v.duration}</span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{v.title}</h3>
                <button className="mt-3 w-full h-10 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 transition">Watch</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Vlog;


