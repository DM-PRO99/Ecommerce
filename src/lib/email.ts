import nodemailer from 'nodemailer';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_PASS,
  EMAIL_FROM,
} = process.env;

const effectivePassword = EMAIL_PASSWORD || EMAIL_PASS;

if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !effectivePassword || !EMAIL_FROM) {
  console.warn('[email] SMTP environment variables are not fully configured');
}

const port = EMAIL_PORT ? parseInt(EMAIL_PORT, 10) : 587;

export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: EMAIL_USER,
    pass: effectivePassword,
  },
});

interface SendLoginEmailParams {
  to: string;
  name?: string | null;
  userAgent?: string | null;
}

export async function sendLoginNotificationEmail({ to, name, userAgent }: SendLoginEmailParams) {
  if (!EMAIL_FROM) return;

  const subject = 'Has iniciado sesión en tu cuenta';

  const html = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:24px 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;padding:24px 24px 20px;">
          <tr>
            <td style="font-size:12px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#6b7280;">Seguridad de la cuenta</td>
          </tr>
          <tr>
            <td style="padding-top:12px;font-size:20px;font-weight:600;color:#0f172a;">Has iniciado sesión correctamente</td>
          </tr>
          <tr>
            <td style="padding-top:8px;font-size:14px;line-height:1.6;color:#6b7280;">
              Hola ${name || ''}, este es un aviso para informarte que se ha iniciado sesión en tu cuenta.
              Si fuiste tú, no necesitas hacer nada más.
            </td>
          </tr>
          <tr>
            <td style="padding-top:16px;padding-bottom:8px;">
              <table cellpadding="0" cellspacing="0" style="width:100%;font-size:12px;color:#4b5563;background:#f9fafb;border-radius:12px;padding:12px 14px;">
                <tr>
                  <td style="padding-bottom:4px;font-weight:500;">Detalles del acceso</td>
                </tr>
                ${userAgent ? `<tr><td style="font-size:11px;color:#6b7280;">Navegador / dispositivo: ${userAgent}</td></tr>` : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:8px;font-size:11px;color:#9ca3af;">
              Si no reconoces este inicio de sesión, te recomendamos cambiar tu contraseña de inmediato.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });
}
