import React from 'react';

const Career = () => {
  const roles = [
    { title: 'Senior Frontend Engineer', type: 'Full‑time', location: 'Remote / Pune', tags: ['React', 'TypeScript', 'UI/UX'] },
    { title: 'Product Designer', type: 'Full‑time', location: 'Remote / Bangalore', tags: ['Figma', 'Design Systems', 'Prototyping'] },
    { title: 'Operations Lead', type: 'Full‑time', location: 'Mumbai', tags: ['Logistics', 'Process', 'Leadership'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="rounded-3xl bg-white border border-amber-100 p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">Build the future of cultural commerce</h1>
            <p className="mt-4 text-gray-600">We are a passionate team crafting premium experiences for global artisans and customers. Join us to make an impact.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Remote‑friendly</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Inclusive Culture</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Growth Mindset</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Wellness & Insurance', desc: 'Comprehensive health cover for you and your family.' },
            { title: 'Learning Budget', desc: 'Annual stipend for courses, books, and conferences.' },
            { title: 'Flexible Hours', desc: 'Own your schedule and do your best work.' },
          ].map((b, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">{b.title}</h3>
              <p className="mt-2 text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Open Roles</h2>
          <button className="px-4 py-2 rounded-xl bg-amber-600 text-white font-medium shadow-lg hover:shadow-xl">Refer a Friend</button>
        </div>
        <div className="space-y-4">
          {roles.map((r, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                  <div className="mt-1 text-sm text-gray-500">{r.type} • {r.location}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{t}</span>
                    ))}
                  </div>
                </div>
                <button className="h-11 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Career;


