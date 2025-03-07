exports.getWeeklyReportEmailTemplate = (userName) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              .container {
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  font-size: 20px;
                  font-weight: bold;
                  color: #333;
                  text-align: center;
              }
              .content {
                  font-size: 16px;
                  color: #555;
                  line-height: 1.5;
                  margin-top: 15px;
              }
              .button {
                  display: inline-block;
                  padding: 12px 20px;
                  margin-top: 20px;
                  color: #fff;
                  background-color: #007BFF;
                  text-decoration: none;
                  font-size: 16px;
                  border-radius: 5px;
              }
              .footer {
                  font-size: 14px;
                  color: #888;
                  margin-top: 20px;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">Weekly Report</div>
              <div class="content">
                  <p>Hello, <strong>${userName}</strong>,</p>
                  <p>Please find the weekly medication report attached below.</p>
              </div>
              <div class="footer">
                  <p>This is an automated message. Please do not reply.</p>
              </div>
          </div>
      </body>
      </html>`;
};
