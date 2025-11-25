import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Verifica si el token de autenticación existe
        return !!token;
      },
    },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
    },
  }
);

// Configura las rutas que requieren autenticación
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/secure/:path*',
  ],
};
