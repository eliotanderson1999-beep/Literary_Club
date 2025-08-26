import React from "react";

// Mock data for testing since jsPDF and html2canvas aren't available in this environment
const mockUserData = {
  fullName: "John Doe",
  branch: "Computer Science",
  registrationNo: "CS2024001",
  mobile: "+1-234-567-8900",
};

const ThankYouPage = ({ userData = mockUserData, onClose }) => {
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

  // Simplified PDF download function for demo (would use jsPDF in real app)
  const downloadInvitationPDF = async () => {
    if (!userData) return;

    // In a real implementation, this would use jsPDF and html2canvas
    // For now, we'll show an alert
    alert(
      `PDF download would be generated for ${userData.fullName}. In a real app, this would use jsPDF and html2canvas libraries.`
    );
  };

  const interviewDate = getInterviewDate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #C4A484 0%, #2F5F4F 100%)",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(47, 95, 79, 0.3)",
          textAlign: "center",
          border: "2px solid rgba(196, 164, 132, 0.3)",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            color: "#2F5F4F",
            fontSize: "4rem",
            marginBottom: "20px",
            textShadow: "0 2px 4px rgba(47, 95, 79, 0.3)",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            color: "#2F5F4F",
            marginBottom: "10px",
            fontSize: "2.5rem",
            textShadow: "0 2px 4px rgba(47, 95, 79, 0.2)",
          }}
        >
          Thank You, {userData?.fullName || "Student"}!
        </h1>

        <p
          style={{
            color: "#8B7355",
            fontSize: "1.1rem",
            marginBottom: "30px",
          }}
        >
          Your application has been submitted successfully
        </p>

        {/* Interview Details Card */}
        <div
          style={{
            background: "linear-gradient(145deg, #F5F0E8, #EDE4D3)",
            border: "2px solid #C4A484",
            borderRadius: "15px",
            padding: "25px",
            margin: "25px 0",
            textAlign: "left",
            boxShadow: "inset 0 2px 4px rgba(196, 164, 132, 0.2)",
          }}
        >
          <h3
            style={{
              color: "#2F5F4F",
              marginBottom: "15px",
              fontSize: "1.3rem",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            📅 Interview Details
          </h3>

          {userData && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                  borderBottom: "1px solid #C4A484",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>Date:</span>
                <span style={{ color: "#8B7355" }}>{interviewDate}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                  borderBottom: "1px solid #C4A484",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>Time:</span>
                <span style={{ color: "#8B7355" }}>2:00 PM - 4:00 PM</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                  borderBottom: "1px solid #C4A484",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>
                  Venue:
                </span>
                <span style={{ color: "#8B7355" }}>
                  Literary Club Room, Main Building
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                  borderBottom: "1px solid #C4A484",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>
                  Your Branch:
                </span>
                <span style={{ color: "#8B7355" }}>{userData.branch}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                  borderBottom: "1px solid #C4A484",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>
                  Registration No:
                </span>
                <span style={{ color: "#8B7355" }}>
                  {userData.registrationNo}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "12px 0",
                }}
              >
                <span style={{ fontWeight: 600, color: "#2F5F4F" }}>
                  Contact:
                </span>
                <span style={{ color: "#8B7355" }}>{userData.mobile}</span>
              </div>
            </>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={downloadInvitationPDF}
          style={{
            background: "linear-gradient(145deg, #2F5F4F, #1A4A3A)",
            color: "white",
            border: "none",
            padding: "15px 35px",
            borderRadius: "12px",
            fontSize: "1rem",
            cursor: "pointer",
            margin: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(47, 95, 79, 0.3)",
            fontWeight: "600",
          }}
          onMouseOver={(e) => {
            e.target.style.background =
              "linear-gradient(145deg, #3A6B5A, #2F5F4F)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(47, 95, 79, 0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.background =
              "linear-gradient(145deg, #2F5F4F, #1A4A3A)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(47, 95, 79, 0.3)";
          }}
        >
          📄 Download Invitation PDF
        </button>

        {/* Important Notice */}
        <div
          style={{
            background: "linear-gradient(145deg, #F4E4C1, #E8D5A3)",
            border: "2px solid #C4A484",
            borderLeft: "6px solid #B8860B",
            padding: "20px",
            borderRadius: "12px",
            margin: "25px 0",
            textAlign: "left",
            boxShadow: "0 2px 8px rgba(196, 164, 132, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            <strong style={{ color: "#8B4513" }}>Important Notice</strong>
          </div>
          <p style={{ color: "#8B4513", margin: "0", lineHeight: "1.5" }}>
            Please bring this invitation (printed or digital) and a valid ID
            card for the interview.
          </p>
        </div>

        {/* Quote */}
        <div
          style={{
            background: "linear-gradient(145deg, #E8DDD4, #DDD0C0)",
            borderRadius: "12px",
            padding: "20px",
            margin: "25px 0",
            border: "1px solid #C4A484",
          }}
        >
          <p
            style={{
              fontStyle: "italic",
              color: "#2F5F4F",
              margin: "0",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                color: "#C4A484",
                position: "absolute",
                top: "-10px",
                left: "-10px",
              }}
            >
              "
            </span>
            The beautiful thing about learning is that no one can take it away
            from you.
            <span
              style={{
                fontSize: "2rem",
                color: "#C4A484",
                position: "absolute",
                bottom: "-30px",
                right: "-10px",
              }}
            >
              "
            </span>
          </p>
        </div>

        <p
          style={{
            color: "#8B7355",
            fontSize: "0.95rem",
            marginTop: "20px",
            lineHeight: "1.5",
          }}
        >
          We look forward to meeting you and learning more about your passion
          for literature!
        </p>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "linear-gradient(145deg, #C4A484, #A8926F)",
              color: "white",
              border: "none",
              padding: "10px 25px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              cursor: "pointer",
              marginTop: "20px",
              transition: "all 0.3s ease",
              fontWeight: "500",
            }}
            onMouseOver={(e) => {
              e.target.style.background =
                "linear-gradient(145deg, #B8985C, #C4A484)";
            }}
            onMouseOut={(e) => {
              e.target.style.background =
                "linear-gradient(145deg, #C4A484, #A8926F)";
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
