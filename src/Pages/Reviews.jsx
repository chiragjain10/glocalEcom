import React from 'react';

const Reviews = () => {
  const testimonials = [
    {
      name: 'Aarav Sharma',
      title: 'Verified Buyer',
      rating: 5,
      text:
        'Beautiful craftsmanship and quick delivery. The quality exceeded my expectations – will order again!',
      avatar: 'https://i.pravatar.cc/100?img=12',
    },
    {
      name: 'Mia Kapoor',
      title: 'Repeat Customer',
      rating: 5,
      text:
        'The detailing is stunning. Packaging was premium and eco-friendly. Highly recommend the store.',
      avatar: 'https://i.pravatar.cc/100?img=32',
    },
    {
      name: 'Logan Patel',
      title: 'Art Enthusiast',
      rating: 4,
      text:
        'Loved the curation and authenticity. One item was slightly delayed but support was responsive.',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
          <div className="text-center">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 mb-3">Trusted by thousands</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Hear from our happy customers
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Authentic reviews from real shoppers. We value transparency and world‑class service.
            </p>
          </div>
        </div>
      </section>

      {/* Ratings Summary */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <div className="text-4xl font-extrabold text-amber-600">4.8</div>
            <div className="text-sm text-gray-500">Average Rating</div>
            <div className="mt-3 flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : ''}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <div className="text-4xl font-extrabold text-amber-600">2,300+</div>
            <div className="text-sm text-gray-500">Verified Reviews</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <div className="text-4xl font-extrabold text-amber-600">98%</div>
            <div className="text-sm text-gray-500">Would Recommend Us</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.title}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : ''}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z"/></svg>
                ))}
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transition">Write a Review</button>
        </div>
      </section>
    </div>
  );
};

export default Reviews;


