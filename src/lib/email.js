import emailjs from "@emailjs/browser";

const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xomh8t5";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_4ivuahd";
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1Gi9AIx3kGJKpOi20";

const isConfigured = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].every(
  (value) => typeof value === "string" && value.trim().length > 0
);

export const sendSignupEmail = async ({ fullName, email }) => {
  if (!isConfigured) {
    console.warn("EmailJS is not fully configured. Skipping signup email.");
    return;
  }

  const templateParams = {
    user_name: fullName || "there",
    email,
  };

  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("✅ Signup email sent:", res.status, res.text);
  } catch (err) {
    console.error("❌ Signup welcome email failed:", err);
  }
};

export default sendSignupEmail;
