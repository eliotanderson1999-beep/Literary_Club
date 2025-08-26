// Google Apps Script code for handling Literary Club form submissions
// This code should be added to Google Apps Script (script.google.com)

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet or create a new one
    let spreadsheet;
    try {
      // Try to get existing spreadsheet by name
      const files = DriveApp.getFilesByName("Literary Club Applications");
      if (files.hasNext()) {
        const file = files.next();
        spreadsheet = SpreadsheetApp.openById(file.getId());
      } else {
        // Create new spreadsheet if it doesn't exist
        spreadsheet = SpreadsheetApp.create("Literary Club Applications");
      }
    } catch (error) {
      // If there's any error, create a new spreadsheet
      spreadsheet = SpreadsheetApp.create("Literary Club Applications");
    }

    const sheet = spreadsheet.getActiveSheet();

    // Check if headers exist, if not, add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "Full Name",
        "Branch/Field of Study",
        "Registration Number",
        "Email Address",
        "Mobile Number",
        "Why Join Literary Club",
        "Rule 1: Original",
        "Rule 2: Honest",
        "Rule 3: Accepting",
        "Rule 4: Heart-Based",
        "All Rules Acknowledged",
        "Application Status",
        "Interview Date",
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#228B22"); // Forest green
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(12);
    }

    // Calculate interview date (7 days from submission)
    const interviewDate = new Date();
    interviewDate.setDate(interviewDate.getDate() + 7);

    // Prepare row data
    const rowData = [
      new Date(data.timestamp),
      data.fullName,
      data.branch,
      data.registrationNo,
      data.email,
      data.mobile,
      data.whyJoin,
      data.rules.original ? "Yes" : "No",
      data.rules.honest ? "Yes" : "No",
      data.rules.accepting ? "Yes" : "No",
      data.rules.heartBased ? "Yes" : "No",
      data.rulesAcknowledged,
      "Pending Review",
      interviewDate.toDateString(),
    ];

    // Add the new row
    sheet.appendRow(rowData);

    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, rowData.length);

    // Format the data row
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    dataRange.setBorder(true, true, true, true, false, false);

    // Alternate row coloring
    if (lastRow % 2 === 0) {
      dataRange.setBackground("#f8fdf8"); // Light green tint
    }

    // Send invitation email
    try {
      sendInvitationEmail(data);
    } catch (emailError) {
      console.log("Email sending failed:", emailError);
      // Don't fail the whole operation if email fails
    }

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Application submitted successfully",
        interviewDate: interviewDate.toDateString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error processing form submission:", error);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: "Failed to process application: " + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "success",
      message: "Literary Club Form Handler is running",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function sendInvitationEmail(userData) {
  const interviewDate = getInterviewDate();

  const subject = "Literary Club - Interview Invitation 📚";

  // Create HTML email body
  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #228B22 0%, #90EE90 100%); padding: 20px; border-radius: 15px;">
      <div style="background: white; border-radius: 15px; padding: 40px; text-align: center; box-shadow: 0 10px 30px rgba(34, 139, 34, 0.3);">
        <div style="border-bottom: 3px solid #228B22; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #228B22; margin: 0; font-size: 2.2em;">📚 Literary Club</h1>
          <h2 style="color: #006400; font-style: italic; margin: 5px 0 0 0;">Interview Invitation</h2>
        </div>
        
        <div style="line-height: 1.8; color: #333;">
          <p style="font-size: 1.1em;">Dear</p>
          <div style="font-size: 1.4em; color: #228B22; font-weight: bold; margin: 20px 0;">
            ${userData.fullName}
          </div>
          <p style="font-size: 1.1em;">We are delighted to invite you for an interview to join our Literary Club community.</p>
          
          <div style="background: #f8fdf8; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #228B22;">
            <h3 style="color: #228B22; margin-bottom: 15px; font-size: 1.3em;">📅 Interview Details</h3>
            <div style="text-align: left; max-width: 400px; margin: 0 auto;">
              <p style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e9f5e9;">
                <strong style="color: #006400;">📅 Date:</strong>
                <span>${interviewDate}</span>
              </p>
              <p style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e9f5e9;">
                <strong style="color: #006400;">⏰ Time:</strong>
                <span>2:00 PM - 4:00 PM</span>
              </p>
              <p style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e9f5e9;">
                <strong style="color: #006400;">📍 Venue:</strong>
                <span>Literary Club Room, Main Building</span>
              </p>
              <p style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e9f5e9;">
                <strong style="color: #006400;">📚 Branch:</strong>
                <span>${userData.branch}</span>
              </p>
              <p style="display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0;">
                <strong style="color: #006400;">📞 Contact:</strong>
                <span>${userData.mobile}</span>
              </p>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #228B22, #90EE90); color: white; padding: 20px; border-radius: 10px; margin: 25px 0;">
            <p style="margin: 0; font-size: 1.1em;">✨ <strong>What to Bring:</strong></p>
            <ul style="text-align: left; margin: 10px 0; padding-left: 20px;">
              <li>Valid ID (Student/Professional)</li>
              <li>This invitation (printed or digital)</li>
              <li>Any literary work samples (optional)</li>
              <li>Your passion for literature! 📖</li>
            </ul>
          </div>
          
          <div style="font-style: italic; color: #666; margin-top: 30px; padding-top: 20px; border-top: 2px solid #90EE90;">
            <p style="font-size: 1.2em; margin-bottom: 10px; color: #228B22;">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <strong style="color: #006400;">- B.B. King</strong>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f0f8f0; border-radius: 10px;">
            <p style="font-size: 1.1em; margin-bottom: 10px; color: #228B22;">
              <strong>We look forward to meeting you!</strong>
            </p>
            <p style="margin: 0; font-weight: bold; color: #006400; font-size: 1.1em;">
              📚 Literary Club Team
            </p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
            <p style="margin: 0; font-size: 0.9em; color: #856404;">
              <strong>Note:</strong> If you need to reschedule or have any questions, please reply to this email or contact us at the club office.
            </p>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: white; font-size: 0.9em;">
        <p style="margin: 0;">This is an automated message from Literary Club Application System</p>
      </div>
    </div>
  `;

  // Plain text version for email clients that don't support HTML
  const textBody = `
Literary Club - Interview Invitation

Dear ${userData.fullName},

We are delighted to invite you for an interview to join our Literary Club community.

Interview Details:
📅 Date: ${interviewDate}
⏰ Time: 2:00 PM - 4:00 PM
📍 Venue: Literary Club Room, Main Building
📚 Branch: ${userData.branch}
📞 Contact: ${userData.mobile}

What to bring:
- Valid ID (Student/Professional)
- This invitation
- Any literary work samples (optional)
- Your passion for literature!

"The beautiful thing about learning is that no one can take it away from you." - B.B. King

We look forward to meeting you!

📚 Literary Club Team

Note: If you need to reschedule or have any questions, please reply to this email.
  `;

  try {
    // Send HTML email
    GmailApp.sendEmail({
      to: userData.email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      attachments: [],
    });

    console.log(`Invitation email sent successfully to: ${userData.email}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${userData.email}:`, error);
    throw error;
  }
}

function getInterviewDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function testFunction() {
  // Test function to verify the script is working
  console.log("Literary Club Form Handler is set up correctly");
  console.log("Test interview date:", getInterviewDate());
  return "Success - Literary Club Handler Ready";
}

// Function to get all applications (for admin use)
function getAllApplications() {
  try {
    const files = DriveApp.getFilesByName("Literary Club Applications");
    if (files.hasNext()) {
      const file = files.next();
      const spreadsheet = SpreadsheetApp.openById(file.getId());
      const sheet = spreadsheet.getActiveSheet();

      const data = sheet.getDataRange().getValues();
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error getting applications:", error);
    return [];
  }
}

// Function to update application status (for admin use)
function updateApplicationStatus(rowIndex, newStatus) {
  try {
    const files = DriveApp.getFilesByName("Literary Club Applications");
    if (files.hasNext()) {
      const file = files.next();
      const spreadsheet = SpreadsheetApp.openById(file.getId());
      const sheet = spreadsheet.getActiveSheet();

      // Update status column (column 13)
      sheet.getRange(rowIndex, 13).setValue(newStatus);

      // Add timestamp for status change
      const now = new Date();
      sheet
        .getRange(rowIndex, 15)
        .setValue(`Status updated: ${now.toLocaleString()}`);

      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating application status:", error);
    return false;
  }
}

// Function to send bulk emails (for admin use)
function sendBulkEmails(emailList, subject, message) {
  let successCount = 0;
  let errorCount = 0;

  emailList.forEach((email) => {
    try {
      GmailApp.sendEmail(email, subject, message);
      successCount++;
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      errorCount++;
    }
  });

  return {
    success: successCount,
    errors: errorCount,
    message: `Sent ${successCount} emails successfully, ${errorCount} failed`,
  };
}

// Function to export applications to PDF (for admin use)
function exportToPDF() {
  try {
    const files = DriveApp.getFilesByName("Literary Club Applications");
    if (files.hasNext()) {
      const file = files.next();
      const spreadsheet = SpreadsheetApp.openById(file.getId());

      // Convert to PDF
      const blob = DriveApp.getFileById(spreadsheet.getId()).getAs(
        "application/pdf"
      );
      const pdfFile = DriveApp.createFile(
        blob.setName(
          "Literary_Club_Applications_" +
            new Date().toISOString().slice(0, 10) +
            ".pdf"
        )
      );

      return pdfFile.getDownloadUrl();
    }
    return null;
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    return null;
  }
}
