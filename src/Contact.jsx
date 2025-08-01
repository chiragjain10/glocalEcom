import React from "react";


const ContactUs = () => {
  return (
    <div className="bg-container">
    <div className="contact-wrapper">
      <div className="contact-container">
        {/* Left Panel */}
        <div className="contact-left">
          <div className="logo">◎◎◎ glassmoon</div>
          <h1 className="title">
            We'd love to<br />hear from you
          </h1>
          <div className="circles">
            <div className="circle"></div>
            <div className="circle dashed"></div>
            <div className="circle"></div>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Modern Day Statement</a>
            <a href="#">Social Impact Statement</a>
          </div>
        </div>

        {/* Right Panel */}
        <div className="contact-right">
      
        

          <h2>Get in touch</h2>

          <form className="contact-form">
            <div className="row">
              <div className="input-group">
                <label>FIRST NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your first name" 
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label>LAST NAME</label>
                <input 
                  type="text" 
                  placeholder="Enter your last name" 
                  className="form-input"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>EMAIL</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label>PHONE NUMBER</label>
                <input 
                  type="text" 
                  placeholder="Enter your phone number" 
                  className="form-input"
                />
              </div>
            </div>
            <div className="input-group full">
              <label>MESSAGE</label>
              <textarea 
                placeholder="Enter your message" 
                rows="4" 
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit <span className="arrow">→</span>
            </button>
          </form>

          <div className="contact-info">
        
  
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;