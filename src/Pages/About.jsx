import React from "react";
import { FaHandsHelping, FaLeaf, FaHistory, FaRupeeSign, FaAward, FaShippingFast } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const About = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section with Parallax Effect */}
            <div className="relative bg-amber-50 py-28 px-4 sm:px-8 lg:px-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585016396082-5c5baebd29e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700 mb-4 md:mb-6 font-serif">
                        Celebrating India's Artistic Soul
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Where centuries-old craftsmanship meets contemporary design
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-10"></div>
                    <button className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-4 rounded-full transition-all font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Discover Our Story 
                    </button>
                </div>
            </div>

            {/* Cultural Journey Timeline */}
            <div className="py-20 px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto">
                <section className="mb-28">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                            Our Cultural Journey
                        </h2>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="relative">
                        {/* Timeline bar */}
                        <div className="hidden md:block absolute left-1/2 h-full w-1 bg-amber-100 transform -translate-x-1/2"></div>

                        {/* Timeline items */}
                        {[
                            {
                                year: "2010",
                                title: "The Beginning",
                                content: "Founded in a small Jaipur workshop with just 5 artisans specializing in blue pottery.",
                                icon: "✋"
                            },
                            {
                                year: "2013",
                                title: "First Expansion",
                                content: "Added textile weavers from Varanasi and wood carvers from Saharanpur to our family.",
                                icon: "🧵",
                                flip: true
                            },
                            {
                                year: "2016",
                                title: "National Recognition",
                                content: "Featured in India Today as one of the top 10 social enterprises preserving heritage crafts.",
                                icon: "🏆"
                            },
                            {
                                year: "2019",
                                title: "Global Reach",
                                content: "Shipped our first international order, taking Indian craftsmanship to 15 new countries.",
                                icon: "🌍",
                                flip: true
                            },
                            {
                                year: "2023",
                                title: "Present Day",
                                content: "Supporting over 500 artisan communities while reviving 45 endangered art forms.",
                                icon: "🎨"
                            }
                        ].map((item, index) => (
                            <div key={index} className={`mb-12 md:mb-16 md:flex md:items-center ${item.flip ? "md:flex-row-reverse" : ""}`}>
                                <div className={`md:w-5/12 ${item.flip ? "md:pl-8" : "md:pr-8"} mb-4 md:mb-0`}>
                                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-700">{item.content}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block md:w-2/12 text-center">
                                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl shadow-lg">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className={`md:w-5/12 ${item.flip ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                                    <span className="text-3xl font-bold text-amber-600">{item.year}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Artisan Showcase with Carousel Effect */}
                <section className="mb-28">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                            Voices from Our Community
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Meet the talented hands and hearts behind our products
                        </p>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto mt-4"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Laxmi Bai",
                                craft: "Block Printing • Rajasthan",
                                quote: "This platform gave me the confidence to experiment with traditional designs while staying true to our roots.",
                                image: "https://images.unsplash.com/photo-1593104547489-5cf65d062dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            },
                            {
                                name: "Rajesh Kumar",
                                craft: "Dhokra Metal Craft • Chhattisgarh",
                                quote: "My family's 200-year-old craft was dying until we connected with this initiative. Now we train 15 young artisans.",
                                image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            },
                            {
                                name: "Fatima Begum",
                                craft: "Zardozi Embroidery • Hyderabad",
                                quote: "The fair pricing model allows me to focus on quality without worrying about feeding my family.",
                                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            }
                        ].map((artisan, index) => (
                            <div key={index} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{artisan.name}</h3>
                                    <p className="text-amber-600 mb-3">{artisan.craft}</p>
                                    <p className="text-gray-700 italic">"{artisan.quote}"</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Artisan Story
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Craftsmanship Process */}
                <section className="mb-28 bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                            The Artisan's Process
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Each piece undergoes a meticulous journey from raw material to finished masterpiece
                        </p>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto mt-4"></div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: <FaLeaf className="text-3xl mb-3" />, title: "Material Sourcing", description: "Locally harvested natural materials from ethical suppliers" },
                            { icon: <FaHistory className="text-3xl mb-3" />, title: "Traditional Techniques", description: "Centuries-old methods passed down through generations" },
                            { icon: <FaHandsHelping className="text-3xl mb-3" />, title: "Artisan Crafting", description: "Skilled hands shaping each piece with precision and care" },
                            { icon: <FaAward className="text-3xl mb-3" />, title: "Quality Check", description: "Rigorous inspection ensuring perfection in every detail" }
                        ].map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all">
                                <div className="text-amber-600 flex justify-center">{step.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-700 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <FaRupeeSign className="text-amber-600 mr-2" />
                                Fair Pricing Model
                            </h3>
                            <p className="text-gray-700">
                                Our transparent pricing ensures artisans receive 3-4x more than local market rates while keeping products affordable for customers.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <FaShippingFast className="text-amber-600 mr-2" />
                                Global Logistics
                            </h3>
                            <p className="text-gray-700">
                                We've developed specialized packaging to protect delicate crafts during international shipping, with carbon-neutral delivery options.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <FaHandsHelping className="text-amber-600 mr-2" />
                                Community Impact
                            </h3>
                            <p className="text-gray-700">
                                15% of profits fund education and healthcare initiatives in artisan communities, creating holistic development.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cultural Heritage Gallery */}
                <section className="mb-28">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                            India's Living Heritage
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Explore the regional diversity of crafts we preserve
                        </p>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { region: "Kashmir", craft: "Pashmina Weaving", image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Rajasthan", craft: "Blue Pottery", image: "https://images.unsplash.com/photo-1585016396082-5c5baebd29e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Gujarat", craft: "Kutch Embroidery", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "West Bengal", craft: "Terracotta", image: "https://images.unsplash.com/photo-1584898171485-98a743b7a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Kerala", craft: "Coir Crafts", image: "https://images.unsplash.com/photo-1589384473379-95a5c1369e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Odisha", craft: "Pattachitra", image: "https://images.unsplash.com/photo-1589384473379-95a5c1369e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Punjab", craft: "Phulkari", image: "https://images.unsplash.com/photo-1589384473379-95a5c1369e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                            { region: "Tamil Nadu", craft: "Tanjore Painting", image: "https://images.unsplash.com/photo-1589384473379-95a5c1369e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
                        ].map((item, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-lg aspect-square">
                                <img
                                    src={item.image}
                                    alt={`${item.region} ${item.craft}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                                    <h3 className="text-white font-semibold">{item.region}</h3>
                                    <p className="text-amber-300 text-sm">{item.craft}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Enhanced CTA */}
                <section className="text-center mb-16 px-4 sm:px-6">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 md:p-12 text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-serif">
                            Become a Cultural Custodian
                        </h2>
                        <p className="text-amber-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
                            Your support helps preserve India's artistic heritage for future generations
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button className="bg-white text-amber-700 hover:bg-gray-100 px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all font-medium text-base sm:text-lg shadow-lg hover:shadow-xl">
                                Shop Collections
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white/10 px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all font-medium text-base sm:text-lg">
                                Support Our Mission
                            </button>
                        </div>
                    </div>
                </section>

                {/* Press & Recognition */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-sm uppercase tracking-wider text-amber-600 mb-2">Featured In</h3>
                        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                        {["Vogue India", "Architectural Digest", "The Hindu", "CNBC", "Forbes India"].map((brand, index) => (
                            <div key={index} className="text-gray-500 font-serif text-xl font-medium hover:text-amber-600 transition-colors">
                                {brand}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;