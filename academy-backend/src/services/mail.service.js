import { getTransporter } from "../config/mailer.js";

const ADMIN_TEMPLATE = (vars) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>body{font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:0}
.wrap{max-width:640px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0}
.hdr{background:#1e293b;padding:24px 32px;color:#fff}.hdr h1{margin:0;font-size:20px;font-weight:600}
.hdr p{margin:4px 0 0;color:#94a3b8;font-size:13px}.body{padding:28px 32px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
.cell{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 14px}
.cell label{font-size:11px;color:#64748b;text-transform:uppercase;display:block;margin-bottom:4px}
.cell span{font-size:14px;color:#1e293b;font-weight:500}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
.Hot{background:#fee2e2;color:#dc2626}.Warm{background:#fef3c7;color:#d97706}.Cold{background:#dbeafe;color:#2563eb}
.ai{background:#f0f9ff;border:1px solid #bae6fd;border-radius:6px;padding:16px 20px;margin-bottom:20px}
.ai h3{margin:0 0 12px;font-size:14px;color:#0369a1}
.ai-row{margin-bottom:10px;font-size:13px}
.ai-row strong{color:#64748b;font-size:11px;text-transform:uppercase;display:block;margin-bottom:3px}
.cta{display:inline-block;background:#2563eb;color:#fff;padding:11px 22px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600}
.ftr{background:#f8fafc;padding:16px 32px;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0}</style>
</head><body><div class="wrap">
<div class="hdr"><h1>🔔 New Enquiry Received</h1><p>${vars.date}</p></div>
<div class="body">
<div class="grid">
<div class="cell"><label>Name</label><span>${vars.name}</span></div>
<div class="cell"><label>Phone</label><span>${vars.phone}</span></div>
<div class="cell"><label>Email</label><span>${vars.email}</span></div>
<div class="cell"><label>Course Interest</label><span>${vars.course}</span></div>
<div class="cell"><label>Source</label><span>${vars.source}</span></div>
<div class="cell"><label>Lead Quality</label><span><span class="badge ${vars.leadQuality}">${vars.leadQuality}</span></span></div>
</div>
<p style="color:#475569;font-size:14px;margin-bottom:20px"><strong>Message:</strong> ${vars.message}</p>
<div class="ai"><h3>🤖 AI Lead Analysis</h3>
<div class="ai-row"><strong>Student Intent</strong>${vars.intent}</div>
<div class="ai-row"><strong>Suggested Tone</strong>${vars.tone}</div>
<div class="ai-row"><strong>Recommended Action</strong>${vars.action}</div>
</div>
<a href="${vars.adminUrl}" class="cta">View in CRM →</a>
</div>
<div class="ftr">Automated notification from your DigitalIndian Skillacademy CRM.</div>
</div></body></html>`;

const STUDENT_TEMPLATE = (vars) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>body{font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:0}
.wrap{max-width:600px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0}
.hdr{background:linear-gradient(135deg,#1e40af,#3b82f6);padding:40px 32px 32px;text-align:center;color:#fff}
.hdr h1{margin:0 0 8px;font-size:24px;font-weight:700}.hdr p{margin:0;opacity:.85;font-size:14px}
.body{padding:32px}.body p{font-size:15px;line-height:1.7;color:#374151;margin:0 0 16px}
.hl{background:#eff6ff;border-left:4px solid #3b82f6;padding:14px 18px;border-radius:0 6px 6px 0;margin:20px 0;font-size:14px;color:#1e40af}
.cta-wrap{text-align:center;margin:28px 0}
.cta{display:inline-block;background:#2563eb;color:#fff;padding:13px 28px;border-radius:6px;text-decoration:none;font-size:15px;font-weight:600}
.ftr{background:#f8fafc;padding:20px 32px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb}
.ftr a{color:#6b7280;text-decoration:none}</style>
</head><body><div class="wrap">
<div class="hdr"><h1>${vars.siteName}</h1><p>Your learning journey begins here</p></div>
<div class="body">
<p>Dear <strong>${vars.name}</strong>,</p>
${vars.mailBody}
<div class="hl">📚 <strong>Course of interest:</strong> ${vars.course}<br/>📞 <strong>We will call you</strong> at the number provided<br/>⏰ <strong>Expected response:</strong> Within 24 hours</div>
<div class="cta-wrap"><a href="${vars.siteUrl}/courses" class="cta">Explore All Courses →</a></div>
<p style="font-size:13px;color:#6b7280">Have questions? Call us: <strong>${vars.phone}</strong></p>
</div>
<div class="ftr">&copy; ${vars.siteName} &middot; <a href="${vars.siteUrl}">${vars.siteUrl}</a></div>
</div></body></html>`;

const cleanStudentMailBody = (mailBody, enquiry) => {
  if (!mailBody || typeof mailBody !== "string") return "";

  let cleaned = mailBody.trim();

  // remove accidental markdown fences
  cleaned = cleaned.replace(/```html|```/gi, "").trim();

  // remove duplicate greeting generated by AI
  cleaned = cleaned.replace(/^\s*<p>\s*Dear[\s\S]*?<\/p>\s*/i, "");
  cleaned = cleaned.replace(/^\s*Dear\s+.*?,\s*/i, "");

  // remove obvious placeholder mistakes
  cleaned = cleaned.replace(/FRONTEND_URL/gi, enquiry.name || "Student");

  return cleaned;
};

export const sendAdminNotification = async (enquiry, aiSummary) => {
  const to = process.env.ADMIN_EMAIL;
  if (!to) return;
  const transporter = await getTransporter();
  const html = ADMIN_TEMPLATE({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    course: enquiry.courseName || "Not specified",
    message: enquiry.message || "—",
    source: enquiry.source,
    leadQuality: aiSummary?.leadQuality || "Unknown",
    intent: aiSummary?.studentIntent || "—",
    action: aiSummary?.actionRecommendation || "—",
    tone: aiSummary?.suggestedTone || "—",
    date: new Date().toLocaleString("en-IN"),
    adminUrl: `${process.env.FRONTEND_URL}/admin/enquiries`,
  });
  await transporter.sendMail({
    from: `"Academy CRM" <${process.env.SMTP_USER}>`,
    to,
    subject: `🔔 New Enquiry: ${enquiry.name} — ${enquiry.courseName || "General"}`,
    html,
  });
};

export const sendStudentAck = async (enquiry, aiSummary) => {
  const transporter = await getTransporter();

  const fallbackBody = `
    <p>Thank you for reaching out to us, <strong>${enquiry.name}</strong>. We have received your enquiry regarding <strong>${enquiry.courseName || "our courses"}</strong>.</p>
    <p>Our expert counselor will contact you shortly to understand your learning goals and guide you toward the right program.</p>
    <p>We look forward to being part of your career journey!</p>
  `;

  const bodyText =
    cleanStudentMailBody(aiSummary?.studentMailBody, enquiry) || fallbackBody;

  const html = STUDENT_TEMPLATE({
    name: enquiry.name,
    course: enquiry.courseName || "our programs",
    mailBody: bodyText,
    siteName: "Academy",
    phone: process.env.SMTP_USER || "",
    siteUrl: process.env.FRONTEND_URL || "#",
  });

  await transporter.sendMail({
    from: `"Academy" <${process.env.SMTP_USER}>`,
    to: enquiry.email,
    subject: `Your enquiry is received — Academy`,
    html,
  });
};
