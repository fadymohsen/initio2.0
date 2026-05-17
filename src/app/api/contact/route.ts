import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND = {
  navy: "#010F24",
  dark: "#061528",
  accent: "#71B8E3",
  accentLight: "#8ec9ec",
  textPrimary: "#ffffff",
  textSecondary: "#D4D4D4",
  textMuted: "#8899aa",
  border: "#1a2a3d",
  logoUrl: "https://www.initio.sa/logo.png",
  siteUrl: "https://www.initio.sa",
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Initio</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.navy};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.navy};min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="${BRAND.siteUrl}" target="_blank" style="text-decoration:none;">
                <img src="${BRAND.logoUrl}" alt="Initio" width="120" style="display:block;border:0;height:auto;" />
              </a>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:${BRAND.dark};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;padding-bottom:16px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <!-- Social icons -->
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://www.instagram.com/initio.sa" target="_blank" style="text-decoration:none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" height="28" style="display:block;border:0;border-radius:6px;" />
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://www.linkedin.com/company/initio-sa" target="_blank" style="text-decoration:none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="28" height="28" style="display:block;border:0;border-radius:6px;" />
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://www.facebook.com/initio.sa" target="_blank" style="text-decoration:none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="28" height="28" style="display:block;border:0;border-radius:6px;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:12px;color:${BRAND.textMuted};opacity:0.5;">
                      &copy; ${new Date().getFullYear()} Initio. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminEmailHtml(name: string, email: string, subject: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "N/A");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return emailWrapper(`
    <!-- Header bar -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background:linear-gradient(135deg,${BRAND.accent},#5a9fcf);padding:28px 36px;">
          <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:rgba(255,255,255,0.7);">New Inquiry</p>
          <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;">Contact Form Submission</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding:36px;">

          <!-- Contact details -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
            <tr>
              <td style="padding:16px 20px;background-color:rgba(113,184,227,0.06);border:1px solid ${BRAND.border};border-radius:12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};">
                      <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${BRAND.textMuted};">From</p>
                      <p style="margin:0;font-size:15px;color:${BRAND.textPrimary};font-weight:500;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid ${BRAND.border};">
                      <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${BRAND.textMuted};">Email</p>
                      <a href="mailto:${safeEmail}" style="font-size:15px;color:${BRAND.accent};text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;">
                      <p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${BRAND.textMuted};">Subject</p>
                      <p style="margin:0;font-size:15px;color:${BRAND.textPrimary};">${safeSubject}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${BRAND.textMuted};">Message</p>
          <div style="font-size:15px;line-height:1.7;color:${BRAND.textSecondary};">
            ${safeMessage}
          </div>

          <!-- Reply button -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:32px;">
            <tr>
              <td style="border-radius:10px;background-color:${BRAND.accent};">
                <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 32px;font-size:13px;font-weight:600;color:${BRAND.navy};text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Reply to ${safeName}</a>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `);
}

function clientEmailHtml(name: string) {
  const safeName = escapeHtml(name);
  const firstName = safeName.split(" ")[0];

  return emailWrapper(`
    <!-- Header bar -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background:linear-gradient(135deg,${BRAND.accent},#5a9fcf);padding:32px 36px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;">We got your message!</h1>
        </td>
      </tr>
    </table>

    <!-- Body -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding:40px 36px;">

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:${BRAND.textSecondary};">
            Hi ${firstName},
          </p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:${BRAND.textSecondary};">
            Thank you for reaching out to us. We&rsquo;ve received your message and our team will review it shortly.
          </p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:${BRAND.textSecondary};">
            You can expect to hear back from us within <strong style="color:${BRAND.textPrimary};">24 hours</strong>. In the meantime, feel free to explore our work or reach out on WhatsApp for urgent inquiries.
          </p>

          <!-- CTA buttons -->
          <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="margin-bottom:36px;">
            <tr>
              <td style="padding-bottom:12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td align="center" style="border-radius:10px;background-color:${BRAND.accent};">
                      <a href="${BRAND.siteUrl}" style="display:block;padding:14px 28px;font-size:13px;font-weight:600;color:${BRAND.navy};text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Visit Our Website</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td align="center" style="border-radius:10px;border:1px solid ${BRAND.border};">
                      <a href="https://wa.me/966595053003" style="display:block;padding:13px 28px;font-size:13px;font-weight:600;color:${BRAND.accent};text-decoration:none;letter-spacing:1px;text-transform:uppercase;">WhatsApp Us</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="border-top:1px solid ${BRAND.border};padding-top:28px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.textMuted};">
                  Warm regards,<br />
                  <strong style="color:${BRAND.textSecondary};">The Initio Team</strong>
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  `);
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await Promise.all([
      // Admin notification
      resend.emails.send({
        from: "Initio Website <info@initio.sa>",
        to: ["info@initio.sa"],
        replyTo: email,
        subject: subject || `New message from ${name}`,
        html: adminEmailHtml(name, email, subject, message),
      }),
      // Client confirmation
      resend.emails.send({
        from: "Initio <info@initio.sa>",
        to: [email],
        subject: "We received your message — Initio",
        html: clientEmailHtml(name),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
