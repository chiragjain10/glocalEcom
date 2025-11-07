import React, { useState, useEffect } from "react";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setShowPopup(true);
    const mql = window.matchMedia("(max-width: 640px)");
    const updateIsMobile = () => setIsMobile(mql.matches);
    updateIsMobile();
    mql.addEventListener ? mql.addEventListener("change", updateIsMobile) : mql.addListener(updateIsMobile);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", updateIsMobile) : mql.removeListener(updateIsMobile);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (() => {
        const baseStyles = {
          overlay: {
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          },
          popup: {
            backgroundColor: "#fff",
            borderRadius: "15px",
            maxWidth: "800px",
            width: "100%",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          },
          closeButton: {
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#eee",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            zIndex: 10,
            fontSize: "18px",
            cursor: "pointer",
            lineHeight: 1,
          },
          container: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          },
          left: {
            flex: "1 1 40%",
            backgroundColor: "#bdb9ae",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          image: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
          },
          right: {
            flex: "1 1 60%",
            padding: "30px",
            textAlign: "center",
          },
          offerText: {
            fontSize: "16px",
            color: "#444",
          },
          discount: {
            color: "#e63946",
            fontSize: "28px",
            fontWeight: "bold",
            margin: "10px 0",
          },
          nextOrder: {
            fontSize: "16px",
            marginBottom: "20px",
          },
          formRow: {
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "15px",
          },
          select: {
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: "1 1 35%",
          },
          input: {
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: "1 1 55%",
          },
          submitBtn: {
            backgroundColor: "orange",
            color: "#fff",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "15px",
          },
          disclaimer: {
            fontSize: "12px",
            color: "#666",
            lineHeight: "1.4",
          },
        };

        const mobileOverrides = isMobile ? {
          popup: {
            maxWidth: "360px",
            borderRadius: "12px",
          },
          container: {
            flexDirection: "column",
          },
          left: {
            display: "none",
          },
          right: {
            padding: "18px",
          },
          offerText: {
            fontSize: "14px",
          },
          discount: {
            fontSize: "22px",
            margin: "6px 0",
          },
          nextOrder: {
            fontSize: "14px",
            marginBottom: "14px",
          },
          formRow: {
            gap: "8px",
            marginBottom: "12px",
          },
          select: {
            padding: "8px",
            flex: "1 1 40%",
          },
          input: {
            padding: "8px",
            flex: "1 1 55%",
          },
          submitBtn: {
            padding: "10px",
            fontSize: "15px",
          },
          disclaimer: {
            fontSize: "11px",
          },
          closeButton: {
            width: "28px",
            height: "28px",
            fontSize: "16px",
          }
        } : {};

        const styles = Object.keys(baseStyles).reduce((acc, key) => {
          acc[key] = { ...baseStyles[key], ...(mobileOverrides[key] || {}) };
          return acc;
        }, {});

        return (
          <div style={styles.overlay}>
            <div style={styles.popup}>
              <button style={styles.closeButton} onClick={handleClose}>&times;</button>

              <div style={styles.container}>
                <div style={styles.left}>
                  <img
                    src="https://cdn.pixabay.com/photo/2019/09/21/19/12/dahlia-4494586_1280.jpg"
                    alt="Welcome"
                    style={styles.image}
                  />
                </div>

                <div style={styles.right}>
                <div className="logo-container">
                  
                    <div className="logo-wrapper">
                      <img
                        src="/images/glocal.png"
                        alt="GlocalShipeComers"
                        className="logo-image"
                      />
                      <div className="logo-glow"></div>
                    </div>
                </div>
                  <p style={styles.offerText}>Subscribe and Get</p>
                  <h2 style={styles.discount}>10% OFF</h2>
                  <p style={styles.nextOrder}>on Your Next Order</p>

                  <div style={styles.formRow}>
                    <select style={styles.select}>
                      <option value="+91">India (+91)</option>
                      <option value="+1">USA (+1)</option>
                      <option value="+44">UK (+44)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      style={styles.input}
                    />
                  </div>

                  <button style={styles.submitBtn}>Get discount code</button>

                  <p style={styles.disclaimer}>
                    I agree to receive automated marketing messages at the phone
                    number provided. Msg & data rates may apply. Reply HELP for
                    help and STOP to cancel. See our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default Popup;
