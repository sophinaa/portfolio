import emailjs from "@emailjs/browser";

export const sendEmail = (form) => {
  const templateParams = {
    from_name: form.name,
    from_email: form.email,
    message: form.message,
    to_name: "Sophina",
  };

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return Promise.reject(
      new Error(
        "Email service is not configured yet. Please set the EmailJS environment variables."
      )
    );
  }

  return emailjs.send(
    serviceId,
    templateId,
    templateParams,
    publicKey
  );
};
