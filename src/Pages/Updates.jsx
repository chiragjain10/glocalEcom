import React from 'react';

const Updates = () => {
  const updates = [
    {
      tag: 'New',
      title: 'Spring Collection Release',
      date: 'Mar 10, 2025',
      desc: 'Fresh arrivals featuring handcrafted decor, textiles, and artisan jewelry.',
    },
    {
      tag: 'Improvement',
      title: 'Faster Checkout',
      date: 'Feb 22, 2025',
      desc: 'Optimized checkout and wallet support for a smoother purchase experience.',
    },
    {
      tag: 'Fix',
      title: 'Wishlist Sync Resolved',
      date: 'Feb 09, 2025',
      desc: 'Resolved intermittent sync issues between devices for wishlists.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">Product Updates</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">Follow along as we ship features, improvements, and fixes to make your experience delightful.</p>
          </div>
          <button className="h-11 px-5 rounded-xl bg-amber-600 text-white font-medium shadow-lg hover:shadow-xl">Subscribe</button>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10">
            {updates.map((u, idx) => (
              <div key={idx} className="relative md:grid md:grid-cols-2 md:gap-10">
                <div className={`md:col-start-${idx % 2 === 0 ? '1' : '2'} md:pr-10`}>
                  <div className="pl-10 md:pl-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">{u.tag}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-gray-900">{u.title}</h3>
                    <p className="mt-2 text-gray-600">{u.desc}</p>
                    <div className="mt-3 text-sm text-gray-500">{u.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;


