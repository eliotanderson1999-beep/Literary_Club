import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const JoinForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    branch: "",
    registrationNo: "",
    email: "",
    mobile: "",
    whyJoin: "",
    rules: {
      original: false,
      honest: false,
      accepting: false,
      heartBased: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwU2Jvnn4BGs8WJ8HNbZ2LAvDvvR679dCPDXgY3jQpFegDVTQ_KjRDSZGQmlc9vkBi3YA/exec";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRuleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      rules: {
        ...prev.rules,
        [name]: checked,
      },
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }
    if (!formData.branch.trim()) {
      alert("Please enter your branch.");
      return false;
    }
    if (!formData.registrationNo.trim()) {
      alert("Please enter your registration number.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile.replace(/[^\d]/g, ""))) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!formData.whyJoin.trim()) {
      alert("Please tell us why you want to join.");
      return false;
    }

    const allRulesChecked = Object.values(formData.rules).every((rule) => rule);
    if (!allRulesChecked) {
      alert("Please acknowledge all club rules to proceed.");
      return false;
    }

    return true;
  };

  // Generate Confirmation PDF
  const generateConfirmationPDF = async (userData) => {
    const element = document.createElement("div");
    element.style.width = "600px";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.innerHTML = `
      <div style="padding:30px; font-family:Georgia; text-align:center; border:3px solid #667eea; border-radius:15px; background:#f8f9ff;">
        <h1 style="color:#667eea; margin-bottom:20px;">Literary Club Application Confirmation</h1>
        <p style="font-size:18px; margin:15px 0;"><b>Dear ${userData.fullName}</b>,</p>
        <p style="font-size:16px; margin:10px 0;">Thank you for your interest in joining our Literary Club. Your application has been successfully submitted.</p>
        <div style="background:white; padding:20px; margin:20px 0; border-radius:10px; border-left:5px solid #667eea;">
          <p style="margin:8px 0;"><b>Name:</b> ${userData.fullName}</p>
          <p style="margin:8px 0;"><b>Branch:</b> ${userData.branch}</p>
          <p style="margin:8px 0;"><b>Registration No:</b> ${userData.registrationNo}</p>
          <p style="margin:8px 0;"><b>Email:</b> ${userData.email}</p>
          <p style="margin:8px 0;"><b>Contact:</b> ${userData.mobile}</p>
        </div>
        <p style="margin-top:25px; font-style:italic; color:#555; font-size:14px;">"The beautiful thing about learning is that no one can take it away from you."</p>
        <p style="margin-top:20px; font-size:12px; color:#888;">Please keep this confirmation for your records and bring it to the interview.</p>
      </div>
    `;

    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Literary_Club_Confirmation_${userData.fullName.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "There was an issue generating the PDF. Please try downloading it from the confirmation page."
      );
    } finally {
      document.body.removeChild(element);
    }
  };

  // Helper function to get interview date (7 days from now)
  const getInterviewDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Create thank you page content
  const createThankYouPage = (userData) => {
    const whatsappGroupLink =
      "https://chat.whatsapp.com/JXwlWBPLjKq9eXpdzwyPmK"; // Replace with actual link
    const interviewDate = getInterviewDate();

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Submitted Successfully - Literary Club</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
          }
          .success-icon {
            color: #10b981;
            font-size: 4rem;
            margin-bottom: 20px;
            animation: bounce 1s ease-in-out;
          }
          @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
          }
          h1 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 2.5rem;
          }
          .subtitle {
            color: #6b7280;
            font-size: 1.1rem;
            margin-bottom: 30px;
          }
          .info-card {
            background: #f8f9ff;
            border: 2px solid #e5e7eb;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            text-align: left;
          }
          .info-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
            text-align: center;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #374151;
          }
          .info-value {
            color: #6b7280;
            text-align: right;
            flex: 1;
            margin-left: 20px;
          }
          .interview-card {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            text-align: left;
          }
          .interview-card h3 {
            color: #0ea5e9;
            margin-bottom: 15px;
            font-size: 1.3rem;
            text-align: center;
          }
          .download-btn, .whatsapp-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
            text-decoration: none;
            display: inline-block;
          }
          .whatsapp-btn {
            background: #25d366;
          }
          .download-btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          }
          .whatsapp-btn:hover {
            background: #22c55e;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
          }
          .quote {
            font-style: italic;
            color: #6b7280;
            margin: 25px 0;
            font-size: 1.1rem;
          }
          .note {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
          }
          .whatsapp-info {
            background: #dcfce7;
            border-left: 4px solid #16a34a;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
          }
          .whatsapp-info h4 {
            color: #166534;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          @media (max-width: 768px) {
            .container { padding: 20px; margin: 10px; }
            h1 { font-size: 2rem; }
            .info-row { flex-direction: column; }
            .info-value { margin-left: 0; text-align: left; margin-top: 5px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <i class="fas fa-check-circle success-icon"></i>
          <h1>Thank You, ${userData.fullName}!</h1>
          <p class="subtitle">Your application has been submitted successfully</p>
          
          <div class="info-card">
            <h3><i class="fas fa-user-check"></i> Application Details</h3>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span class="info-value">${userData.fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Branch:</span>
              <span class="info-value">${userData.branch}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Registration No:</span>
              <span class="info-value">${userData.registrationNo}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">${userData.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Contact:</span>
              <span class="info-value">${userData.mobile}</span>
            </div>
          </div>

          <div class="whatsapp-info">
            <h4><i class="fab fa-whatsapp"></i> Join Our WhatsApp Group</h4>
            <p style="margin-bottom: 15px;">
              Stay connected with the Literary Club community! Join our WhatsApp group to receive updates about club activities, events, meetings, and important announcements.
            </p>
            <p style="margin-bottom: 15px; font-weight: 600; color: #166534;">
              <i class="fas fa-calendar-check" style="margin-right: 8px;"></i>
              Join the WhatsApp group for detailed interview information, venue directions, and any last-minute updates.
            </p>
            <p style="font-size: 0.9rem; color: #166534;">
              All further communications regarding your application, interview details, and club activities will be shared through this group.
            </p>
          </div>

          <a href="${whatsappGroupLink}" target="_blank" class="whatsapp-btn" style="color: white;">
            <i class="fab fa-whatsapp"></i> Join WhatsApp Group
          </a>

          <button class="download-btn" onclick="downloadPDF()">
            <i class="fas fa-download"></i> Download Confirmation PDF
          </button>

          <div class="note">
            <strong>Important:</strong> Please save this confirmation, join the WhatsApp group, and bring this confirmation (printed or digital) along with a valid ID card to the interview.
          </div>

          <p class="quote">"The beautiful thing about learning is that no one can take it away from you."</p>
          
          <p style="color: #6b7280; font-size: 0.9rem;">
            We look forward to meeting you and learning more about your passion for literature!
          </p>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script>
          function downloadPDF() {
            const userData = ${JSON.stringify(userData)};
            const interviewDate = "${interviewDate}";

            const element = document.createElement("div");
            element.style.width = "600px";
            element.style.position = "absolute";
            element.style.left = "-9999px";
            element.innerHTML = \`
              <div style="padding:30px; font-family:Georgia; text-align:center; border:3px solid #667eea; border-radius:15px; background:#f8f9ff;">
                <h1 style="color:#667eea; margin-bottom:20px;">Literary Club Application Confirmation</h1>
                <p style="font-size:18px; margin:15px 0;"><b>Dear \${userData.fullName}</b>,</p>
                <p style="font-size:16px; margin:10px 0;">Thank you for your interest in joining our Literary Club. Your application has been successfully submitted.</p>
                <div style="background:white; padding:20px; margin:20px 0; border-radius:10px; border-left:5px solid #667eea;">
                  <p style="margin:8px 0;"><b>Name:</b> \${userData.fullName}</p>
                  <p style="margin:8px 0;"><b>Branch:</b> \${userData.branch}</p>
                  <p style="margin:8px 0;"><b>Registration No:</b> \${userData.registrationNo}</p>
                  <p style="margin:8px 0;"><b>Email:</b> \${userData.email}</p>
                  <p style="margin:8px 0;"><b>Contact:</b> \${userData.mobile}</p>
                </div>
                <div style="background:#f0f9ff; padding:15px; margin:20px 0; border-radius:8px; border-left:4px solid #0ea5e9;">
                  <h3 style="color:#0ea5e9; margin-bottom:10px;">Interview Details</h3>
                  <p style="margin:5px 0;"><b>Date:</b> \${interviewDate}</p>
                  <p style="margin:5px 0;"><b>Time:</b> 2:00 PM - 4:00 PM</p>
                  <p style="margin:5px 0;"><b>Venue:</b> Literary Club Room, Main Building</p>
                </div>
                <p style="margin-top:25px; font-style:italic; color:#555; font-size:14px;">"The beautiful thing about learning is that no one can take it away from you."</p>
                <p style="margin-top:20px; font-size:12px; color:#888;">Please keep this confirmation for your records and bring it to the interview.</p>
              </div>
            \`;

            document.body.appendChild(element);
            
            html2canvas(element, { backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
              const imgData = canvas.toDataURL("image/png");
              const { jsPDF } = window.jspdf;
              const pdf = new jsPDF("p", "mm", "a4");
              const imgProps = pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

              pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              pdf.save(\`Literary_Club_Confirmation_\${userData.fullName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf\`);
              document.body.removeChild(element);
            }).catch(error => {
              console.error("Error generating PDF:", error);
              alert("There was an issue generating the PDF. Please contact us for assistance.");
              document.body.removeChild(element);
            });
          }
        </script>
      </body>
      </html>
    `;
  };

  const clearForm = () => {
    setFormData({
      fullName: "",
      branch: "",
      registrationNo: "",
      email: "",
      mobile: "",
      whyJoin: "",
      rules: {
        original: false,
        honest: false,
        accepting: false,
        heartBased: false,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Store form data before clearing (for PDF generation and thank you page)
      const submittedData = { ...formData };

      // Submit to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedData),
      });

      // Clear the form immediately after successful submission
      clearForm();

      // Generate and download PDF using stored data
      await generateConfirmationPDF(submittedData);

      // Create thank you content and redirect to new page using stored data
      const thankYouContent = createThankYouPage(submittedData);

      // Small delay to ensure form clearing is visible before navigation
      setTimeout(() => {
        // Create a blob URL and navigate to it directly
        const blob = new Blob([thankYouContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // Navigate to the thank you page in the same tab
        window.location.href = url;
      }, 500); // 500ms delay to show cleared form briefly
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was an issue submitting your application. Please try again or contact us for assistance."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const rules = [
    {
      name: "original",
      label: "I will be original and authentic in my expressions",
    },
    { name: "honest", label: "I will express my honest opinions respectfully" },
    {
      name: "accepting",
      label: "I will respect and accept different perspectives",
    },
    { name: "heartBased", label: "I will make decisions from heart, not fear" },
  ];

  return (
    <section id="form" className="form-section">
      <div className="container">
        <h2>Join Our Literary Community</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="join-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch *</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Mechanical Engineering"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationNo">Registration Number *</label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleInputChange}
                placeholder="Enter your registration number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="whyJoin">
                Why do you want to join our Literary Club? *
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                rows="5"
                value={formData.whyJoin}
                onChange={handleInputChange}
                placeholder="Share your passion for literature and what you hope to gain from joining our club..."
                required
              />
            </div>

            <div className="rules-acknowledgment">
              <h4>Club Rules Acknowledgment:</h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "15px",
                }}
              >
                Please read and acknowledge the following club principles:
              </p>
              <div className="checkbox-group">
                {rules.map((rule, index) => (
                  <label key={index} className="checkbox-label">
                    <input
                      type="checkbox"
                      name={rule.name}
                      checked={formData.rules[rule.name]}
                      onChange={handleRuleChange}
                      required
                    />
                    <span className="checkmark"></span>
                    {rule.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Submitting
                  Application...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
