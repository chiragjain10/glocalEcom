import React, { useState } from 'react';

import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });


  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(formData);

    const phoneNumber = '919555144777';
    const text = `New Contact Inquiry:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone || '-'}\nSubject: ${formData.subject || '-'}\nMessage: ${formData.message}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank');

    setIsSubmitting(false);
    // TODO: Add actual submission logic
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="custom-hero">
  <div className="overlay"></div>
  <div className="hero-content">
    <div className="hero-text">
      <h1>Get in Touch</h1>
      <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    </div>
  </div>
</section>



      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Message</h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Info</h2>

              <div className="contact-cards">
                <div className="contact-card">
                  <div className="card-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="card-content">
                    <h4>Address</h4>
                    <p>Online Store, Worldwide</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="card-icon">
                    <FaEnvelope />
                  </div>
                  <div className="card-content">
                    <h4>Email</h4>
                    <p>hello@glocalship.com</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="card-icon">
                    <FaPhone />
                  </div>
                  <div className="card-content">
                    <h4>Phone</h4>
                    <p>+91 95551 44777</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="card-icon">
                    <FaClock />
                  </div>
                  <div className="card-content">
                    <h4>Hours</h4>
                    <p>24/7 Support</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {/* <div className="social-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-link">
                    <FaFacebook />
                  </a>
                  <a href="#" className="social-link">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-link">
                    <FaLinkedin />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          background: #fafafa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .hero-content p {
          font-size: 1.125rem;
          opacity: 0.9;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Main Contact Section */
        .main-contact-section {
          padding: 4rem 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-form-section h2,
        .contact-info-section h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #1a1a1a;
        }

        /* Contact Form */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          background: white;
          color: #1a1a1a;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #9ca3af;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          border: none;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Contact Info Section */
        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .card-content h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-content p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
        }

        /* Social Section */
        .social-section h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .social-link:hover {
          transform: translateY(-2px);
        }

        .social-link:nth-child(1) { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
        .social-link:nth-child(2) { background: #1877f2; }
        .social-link:nth-child(3) { background: #1da1f2; }
        .social-link:nth-child(4) { background: #0077b5; }

        /* Map Section */
        .map-section {
          padding: 2rem 0 4rem;
        }

        .map-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .hero-content h1 {
            font-size: 2.25rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .main-contact-section {
            padding: 3rem 0;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 3rem 0;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .contact-form-section h2,
          .contact-info-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
