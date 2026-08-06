// services/mail.service.js

import transporter from "../config/mail.js";

export const sendExpiryReminderMail = async (email, name, foods) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#16a34a;padding:20px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;">🍎 FoodExpiry</h1>
    </div>

    <div style="padding:30px;">
      <h2 style="margin-top:0;color:#111827;">
        Hello ${name},
      </h2>

      <p style="color:#4b5563;font-size:16px;line-height:1.6;">
        This is a friendly reminder that some of your food items are
        <strong>expiring soon.</strong>
      </p>

      <table
        style="
          width:100%;
          border-collapse:collapse;
          margin:25px 0;
        "
      >
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:12px;border:1px solid #e5e7eb;text-align:left;">
              Food
            </th>
            <th style="padding:12px;border:1px solid #e5e7eb;text-align:left;">
              Expiry Date
            </th>
            <th style="padding:12px;border:1px solid #e5e7eb;text-align:left;">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          ${foods
            .map(
              (food) => `
                <tr>
                  <td style="padding:12px;border:1px solid #e5e7eb;">
                    ${food.name}
                  </td>

                  <td style="padding:12px;border:1px solid #e5e7eb;">
                    ${new Date(food.expiryDate).toLocaleDateString()}
                  </td>

                  <td style="padding:12px;border:1px solid #e5e7eb;color:#dc2626;font-weight:bold;">
                    ${food.status}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>

      <p style="color:#4b5563;font-size:15px;line-height:1.6;">
        Please consume these items as soon as possible to reduce food waste.
      </p>

      <div style="text-align:center;margin-top:30px;">
        <a
          href="http://localhost:5173/my-foods"
          style="
            display:inline-block;
            background:#16a34a;
            color:#ffffff;
            text-decoration:none;
            padding:12px 24px;
            border-radius:6px;
            font-weight:bold;
          "
        >
          View My Foods
        </a>
      </div>
    </div>

    <div
      style="
        background:#f9fafb;
        padding:20px;
        text-align:center;
        color:#6b7280;
        font-size:13px;
      "
    >
      This is an automated email from <strong>FoodExpiry</strong>.<br />
      Please do not reply to this email.
    </div>

  </div>
</body>
</html>
`;

  await transporter.sendMail({
    from: `"FoodExpiry" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "🍎 Food Expiry Reminder",
    html,
  });
};
