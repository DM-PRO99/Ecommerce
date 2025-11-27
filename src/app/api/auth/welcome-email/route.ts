import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    const missingEnvVars = ['SMTP_USER', 'SMTP_PASS'].filter((key) => !process.env[key]);

    if (missingEnvVars.length > 0) {
      console.warn(
        'Omitiendo envío de bienvenida por falta de credenciales SMTP:',
        missingEnvVars,
      );

      return NextResponse.json(
        {
          message:
            'Email de bienvenida omitido porque faltan credenciales SMTP en el entorno.',
        },
        { status: 200 },
      );
    }

// Configurar transporter de nodemailer - VERCEL CACHE CLEAR v2.0
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email de bienvenida
    const mailOptions = {
      from: `"${process.env.APP_NAME || 'Ecommerce Dashboard'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '¡Bienvenido a tu Dashboard! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 15px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .logo svg {
              width: 30px;
              height: 30px;
              color: white;
            }
            h1 {
              color: #1f2937;
              font-size: 28px;
              margin-bottom: 10px;
              font-weight: 700;
            }
            .subtitle {
              color: #6b7280;
              font-size: 16px;
              margin-bottom: 30px;
            }
            .features {
              background: #f9fafb;
              border-radius: 15px;
              padding: 25px;
              margin: 30px 0;
        }
            .feature {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }
            .feature:last-child {
              margin-bottom: 0;
            }
            .feature-icon {
              width: 40px;
              height: 40px;
              background: #e0e7ff;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 15px;
              flex-shrink: 0;
            }
            .feature-icon svg {
              width: 20px;
              height: 20px;
              color: #6366f1;
            }
            .feature-text h3 {
              margin: 0 0 5px 0;
              color: #1f2937;
              font-size: 16px;
              font-weight: 600;
            }
            .feature-text p {
              margin: 0;
              color: #6b7280;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 10px;
              font-weight: 600;
              text-align: center;
              margin: 30px 0;
              transition: transform 0.2s;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .stats {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 30px 0;
            }
            .stat {
              text-align: center;
              padding: 20px;
              background: #f9fafb;
              border-radius: 10px;
            }
            .stat-number {
              font-size: 24px;
              font-weight: 700;
              color: #6366f1;
              margin-bottom: 5px;
            }
            .stat-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1>¡Bienvenido a tu Dashboard! 🎉</h1>
              <p class="subtitle">Tu acceso al ecommerce profesional está listo</p>
            </div>

            <div class="stats">
              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Disponibilidad</div>
              </div>
              <div class="stat">
                <div class="stat-number">100%</div>
                <div class="stat-label">Seguro</div>
              </div>
              <div class="stat">
                <div class="stat-number">∞</div>
                <div class="stat-label">Productos</div>
              </div>
            </div>

            <div class="features">
              <div class="feature">
                <div class="feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="feature-text">
                  <h3>Gestión Completa</h3>
                  <p>Administra productos, pedidos y clientes desde un solo lugar</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="feature-text">
                  <h3>Analytics en Tiempo Real</h3>
                  <p>Estadísticas detalladas de ventas y rendimiento</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div class="feature-text">
                  <h3>Seguridad Garantizada</h3>
                  <p>Tus datos protegidos con encriptación de nivel empresarial</p>
                </div>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" class="cta-button">
                Ir a mi Dashboard →
              </a>
            </div>

            <div class="footer">
              <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
              <p>© 2024 ${process.env.APP_NAME || 'Ecommerce Dashboard'}. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email de bienvenida enviado exitosamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al enviar email de bienvenida:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email de bienvenida' },
      { status: 500 }
    );
  }
}
