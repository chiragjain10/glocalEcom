import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone ,FaClock,FaUser, FaClipboardList, FaShoppingBag} from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Add submission logic (e.g., API call)
  };

  return (
    <section className="contact-section" style={{background:"bg-gray-50  py-16 px-4 "}}>
      {/* <div className="container-fluid" style={{ marginBottom: "40px" }}> */}
        <h2 style={{ textAlign: "center", color: "black" }}>Connect With Artisan</h2>
        <p style={{ textAlign: "center", color: "black" }}>
          Have a question about a handicraft Product or want to collaborate with <br />traditional artisan
        </p>
      {/* </div> */}

      <div className="container my-5">
        <div className="contact-container d-flex flex-wrap justify-content-between">

          {/* Left: Contact Form */}
          <div className="contact-form col-md-6 mb-4">
            <h3 className="fw-bold text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">Send us a message</h3>
            <p className="text-muted">We typically respond within 24 hours</p>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">First Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Last Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="General Inquiry"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message*</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about your inquiry..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="contact-info col-md-5 mt-md-0 mt-5">
            <h3>Our Information</h3>
              <p className="text-muted">
            Visit our workshop in Bikaner or reach out through any of these channels.
            Our team of traditional artisans and customer support specialists are here to assist you.
          </p>
            <ul className="list-unstyled" >
              <li className="mb-3" style={{background:"linear-gradient(to bottom, #fbe2c3)", width:"100%", height:"100%"}}>
                <FaMapMarkerAlt style={{color:"#d97706"}} />
                WorkShop Location
                <br/>
                                
                  Craft Street, Bikaner, Rajasthan 334001, India<br />
                  Near Junagarh Fort, opposite Heritage Museum
                

              </li>
              <br/>
              <li className="mb-3"style={{background:"linear-gradient(to bottom, #fbe2c3", width:"100%", height:"100%"}}>
                <FaEnvelope style={{color:"#d97706"}} />
                Email adderess
                <br/>
                support@kalabazaar.in (General inquiries)<br />
                  orders@kalabazaar.in (Purchase questions)<br />
                  artisans@kalabazaar.in (Collaborations)

              </li>
              <br/>
              <li className="mb-3"style={{background:"linear-gradient(to bottom, #fbe2c3)", width:"100%", height:"100%"}}>
                <FaPhone style={{color:"#d97706"}} />
                Contact Number
                <br/> 
                +91 1234-567-890<br />
                +91 9876-543-210

              </li>
                <br/>
              <li className="mb-3"style={{background:"linear-gradient(to bottom, #fbe2c3)", width:"100%", height:"100%"}}>
                  <FaClock style={{color:"#d97706"}} />
                <h6 className="fw-bold mb-1">Business Hours</h6>
                <p className="mb-0">
                  Monday - Saturday: 10AM - 7PM<br />
                  Sunday: Closed (Artisan rest day)<br />
                  <span className="text-danger">Workshop visits by appointment only</span>
                </p>

              </li>
            </ul>
          </div>

        </div>
      </div>
         <div className="container my-5 text-center"style={{background:"white"}}>
      {/* Section Heading */}
      <h2 className="fw-bold" style={{background:"bg-gray-50  py-16 px-4"}}>Visit Our Workshop</h2>
      <p className="text-muted mb-4">
        Our workshop in Bikaner is open for visitors by appointment. See our artisans create traditional
        handicrafts using centuries-old techniques.
      </p>

      {/* Google Map */}
      <div className="mb-5">
        <iframe
          title="Workshop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14237.161414122237!2d73.29796279826402!3d28.022934769029904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393fbd8f7c43c2c9%3A0x36b79a1f6c832c62!2sJunagarh%20Fort!5e0!3m2!1sen!2sin!4v1691594785586!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Feature Cards */}
      <div className="row text-start">
        <div className="col-md-4 mb-4">
          <div className="p-4 bg-white rounded shadow-sm h-100">
            <div className="d-flex align-items-center mb-2">
              <FaClipboardList className="text-warning fs-3 me-2" />
              <h5 className="mb-0">Workshop Tours</h5>
            </div>
            <p className="text-muted mb-0">
              Book a guided tour to see our artisans at work and explore the traditional methods we preserve.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-4 bg-white rounded shadow-sm h-100">
            <div className="d-flex align-items-center mb-2">
              <FaUser className="text-warning fs-3 me-2" />
              <h5 className="mb-0">Meet the Artisans</h5>
            </div>
            <p className="text-muted mb-0">
              Schedule a session with our master artisans for personalized interaction and learning.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-4 bg-white rounded shadow-sm h-100">
            <div className="d-flex align-items-center mb-2">
              <FaShoppingBag className="text-warning fs-3 me-2" />
              <h5 className="mb-0">Workshop Shop</h5>
            </div>
            <p className="text-muted mb-0">
              Visit our on-site shop featuring exclusive pieces not available online — straight from the source.
            </p>
          </div>
        </div>
      </div>
    </div>
      {/* Footer */}
      <footer className="contact-footer text-center py-3">
        <h4>
          <span className="fw-bold">Glocalship</span>
          <span className="text-warning">Ecommerce</span>
        </h4>
      </footer>
    </section>
  );
};

export default ContactUs;
