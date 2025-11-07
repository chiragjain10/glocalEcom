import React from "react";
import { FaHandsHelping, FaLeaf, FaHistory, FaRupeeSign, FaAward, FaShippingFast } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const About = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section with Parallax Effect */}
            <section className="custom-hero about-hero">
                <div className="overlay"></div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Celebrating India's Artistic Soul</h1>
                        <p>Where centuries-old craftsmanship meets contemporary design</p>
                        <a href="/about" className="hero-button">Discover Our Story</a>
                    </div>
                </div>
            </section>


            {/* Cultural Journey Timeline */}
            <div className="py-20 px-4 sm:px-8 lg:px-20 max-w-7xl mx-auto">
                <section className="mb-28">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                            About Us
                        </h2>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">GlocalShip House</h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            GlocalShip House has been at the heart of the global book trade for over 13 years, proudly serving as a trusted wholesaler and supplier of books across the world. With a legacy built on passion for literature, knowledge, and education, we have established ourselves as a reliable source for quality titles spanning all genres and disciplines.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Founded with the vision of making books accessible across borders, GlocalShip House has grown into a dynamic international presence with operations in the United Kingdom (GlocalShip House Ltd) and the United States (GlocalShip House). Over the decades, we’ve formed strong partnerships with leading distributors and publishers globally, allowing us to offer an extensive catalogue of books from renowned publishers worldwide.
                        </p>
                    </div>
                </section>

                {/* Artisan Showcase with Carousel Effect */}
                <section className="mb-28">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">What We Do</h2>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">Wholesale Distribution</h3>
                            <p className="text-gray-700 text-sm">Supplying books in bulk to retailers, institutions, and libraries globally.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">International Sourcing</h3>
                            <p className="text-gray-700 text-sm">Leveraging our global network to source titles directly from the UK and the US.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">Customized Supply Solutions</h3>
                            <p className="text-gray-700 text-sm">Catering to e-commerce platforms, bookstores, educational institutions, and government libraries.</p>
                        </div>
                    </div>
                </section>

                {/* Craftsmanship Process */}
                <section className="mb-28 bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">Our Commitment</h2>
                            <p className="text-gray-700 mb-4">At GlocalShip House, we believe books are more than products — they are gateways to learning, imagination, and transformation. Our mission is to deliver exceptional service, curated content, and a seamless supply chain that connects books to those who seek them, anywhere in the world.</p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Decades of experience in the global book trade</li>
                                <li>Strong partnerships with leading publishers and distributors</li>
                                <li>Reliable service tailored to each client</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">Global Reach, Local Expertise</h2>
                            <p className="text-gray-700">Whether you’re a bookstore in Europe, a university in Asia, or a public library in North America, we bring decades of experience and a commitment to excellence in every transaction. Our team blends deep industry knowledge with a passion for books, ensuring that each client receives the attention and support they deserve.</p>
                        </div>
                    </div>
                </section>

                {/* Cultural Heritage Gallery */}
                <section className="mb-28">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">Key Highlights</h2>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "13+ Years", desc: "Industry Experience" },
                            { label: "Global", desc: "Wholesale Reach" },
                            { label: "UK & USA", desc: "Operations" },
                            { label: "Trusted", desc: "By Libraries & Institutions" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                                <div className="text-2xl font-bold text-amber-600">{stat.label}</div>
                                <div className="text-gray-700 text-sm">{stat.desc}</div>
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
            </div>
        </div>
    );
};

export default About;