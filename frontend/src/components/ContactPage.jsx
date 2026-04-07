import React, { useState } from "react";
import { contactPageStyles } from "../assets/dummyStyles";
import {
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  SendHorizonal,
  Stethoscope,
  User,
} from "lucide-react";

const ContactPage = () => {
  const initial = {
    name: "",
    email: "",
    phone: "",
    department: "",
    service: "",
    message: "",
  };

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const departments = [
    "General Physician",
    "Cardiology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
  ];

  const servicesMapping = {
    "General Physician": [
      "General Consultation",
      "Adult Checkup",
      "Vaccination",
      "Health Screening",
    ],
    Cardiology: [
      "ECG",
      "Echocardiography",
      "Stress Test",
      "Heart Consultation",
    ],
    Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
    Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
    Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
    Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
  };

  const genericServices = [
    "General Consultation",
    "ECG",
    "Blood Test",
    "X-Ray",
    "Ultrasound",
    "Physiotherapy",
    "Vaccination",
  ];

  //   this function validates that all fields are filled
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      e.phone = "Phone number must be exactly 10 digits";

    if (!form.department && !form.service) {
      e.department = "Please choose a department or service";
      e.service = "Please choose a department or service";
    }

    if (!form.message.trim()) e.message = "Please write a short message";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "department") {
      setForm((prev) => ({ ...prev, department: value, service: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "department" || name === "service") {
      setErrors((prev) => {
        const copy = { ...prev };
        if (
          (name === "department" && value) ||
          (name === "service" && value) ||
          form.department ||
          form.service
        ) {
          delete copy.department;
          delete copy.service;
        }
        return copy;
      });
    }
  }

  //   to submit to whatsapp
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const text = `*Contact Request*\nName: ${form.name}\nEmail: ${
      form.email
    }\nPhone: ${form.phone}\nDepartment: ${
      form.department || "N/A"
    }\nService: ${form.service || "N/A"}\nMessage: ${form.message}`;

    const url = `https://wa.me/8607269214?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setForm(initial);
    setErrors({});
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  //   shows the department specific services for screens
  const availableServices = form.department
    ? servicesMapping[form.department] || []
    : genericServices;

  return (
    <div className={contactPageStyles.pageContainer}>
      <div className={contactPageStyles.bgAccent1}></div>
      <div className={contactPageStyles.bgAccent2}></div>
      <div className={contactPageStyles.gridContainer}>
        <div className={contactPageStyles.formContainer}>
          <h2 className={contactPageStyles.formTitle}>Contact Our Clinic</h2>
          <p className={contactPageStyles.formSubtitle}>
            Fill the form - we'll open Whatsapp so you can contact with us
            instantly.
          </p>

          <form onSubmit={handleSubmit} className={contactPageStyles.formSpace}>
            <div className={contactPageStyles.formGrid}>
              <div>
                <label className={contactPageStyles.label}>
                  <User size={16} />
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={contactPageStyles.input}
                />
                {errors.name && (
                  <p className={contactPageStyles.error}>{errors.name}</p>
                )}
              </div>

              <div>
                <label className={contactPageStyles.label}>
                  <Mail size={16} />
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={contactPageStyles.input}
                />
                {errors.email && (
                  <p className={contactPageStyles.error}>{errors.email}</p>
                )}
              </div>
            </div>

            <div className={contactPageStyles.formGrid}>
              <div>
                <label className={contactPageStyles.label}>
                  <Phone size={16} /> Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={contactPageStyles.input}
                  maxLength="10"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className={contactPageStyles.error}>{errors.phone}</p>
                )}
              </div>

              <div>
                <label className={contactPageStyles.label}>
                  <MapPin size={16} /> Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={contactPageStyles.input}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className={contactPageStyles.error}>{errors.department}</p>
                )}
              </div>
            </div>

            <div>
              <label className={contactPageStyles.label}>
                <Stethoscope size={16} /> Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={contactPageStyles.input}
              >
                <option value="">
                  Select Services (or choose Department above)
                </option>
                {availableServices.map((s) => (
                  <option value="s" key={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className={contactPageStyles.error}>{errors.service}</p>
              )}
            </div>
            <div>
              <label className={contactPageStyles.label}>
                <MessageSquare size={16} /> Message
              </label>
              <textarea
                name="message"
                value={form.value}
                onChange={handleChange}
                placeholder="Describe your concern briefly..."
                rows={4}
                className={contactPageStyles.textarea}
              />
              {errors.message && (
                <p className={contactPageStyles.error}>{errors.message}</p>
              )}
            </div>
            <div className={contactPageStyles.buttonContainer}>
              <button type="submit" className={contactPageStyles.button}>
                <SendHorizonal size={18} /> <span>Send via WhatsApp</span>
              </button>
              {sent && (
                <p className={contactPageStyles.sentMessage}>
                  Opening WhatsApp and clearing form...
                </p>
              )}
            </div>
          </form>
        </div>

        {/* right side */}
        <div className={contactPageStyles.infoContainer}>
          <div className={contactPageStyles.infoCard}>
            <h3 className={contactPageStyles.infoTitle}>Visit our Clinic</h3>
            <p className={contactPageStyles.infoText}>
              Gurugram, Noida, New Delhi
            </p>
            <p className={contactPageStyles.infoItem}>
              <Phone size={16} /> 8607269214
            </p>
            <p className={contactPageStyles.infoItem}>
              <Mail size={16} /> sharmajii87080@gmail.com
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1360.5396180758619!2d77.05789431476079!3d28.475699499801117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1900b44d58b9%3A0xfd361343c683434a!2sF3G5%2B834%2C%20Dahiya%20Gali%2C%20Sukhrali%2C%20Sector%2017%2C%20Gurugram%2C%20Haryana%20122007!5e0!3m2!1sen!2sin!4v1775457355865!5m2!1sen!2sin"
            className={contactPageStyles.map}
            title="Gomti Nagar Map"
            loading="lazy"
            allowFullScreen
          ></iframe>
          <div className={contactPageStyles.hoursContainer}>
            <h4 className={contactPageStyles.hoursTitle}>Clinic Hours</h4>
            <p className={contactPageStyles.hoursText}>
              Mon - Sat: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      <style>{contactPageStyles.animationKeyframes}</style>
    </div>
  );
};

export default ContactPage;
