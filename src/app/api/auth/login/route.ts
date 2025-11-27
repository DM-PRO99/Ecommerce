import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { loginSchema } from '@/validations/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body against the schema
    try {
      await loginSchema.validate(body, { abortEarly: false });
    } catch (validationError: any) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationError.inner.reduce((acc: Record<string, string>, err: any) => {
            acc[err.path] = err.message;
            return acc;
          }, {}),
        },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Attempt to sign in
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

    // Get the user session
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`);
    const session = await response.json();

    if (!session.user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create session' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during login' 
      },
      { status: 500 }
    );
  }
}
