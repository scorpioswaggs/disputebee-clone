import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '/login';
  },
}));

// Import components to test
import LoginForm from '@/app/login/LoginForm';

describe('LoginForm Component', () => {
  it('renders the login form with title', () => {
    render(<LoginForm />);
    
    // Check if the title is rendered
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Log in to your account')).toBeInTheDocument();
  });
  
  it('renders email and password input fields', () => {
    render(<LoginForm />);
    
    // Check if input fields are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
  
  it('renders remember me checkbox and forgot password link', () => {
    render(<LoginForm />);
    
    // Check if checkbox and link are rendered
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });
  
  it('renders login button', () => {
    render(<LoginForm />);
    
    // Check if login button is rendered
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });
  
  it('shows validation errors for empty fields on submit', async () => {
    render(<LoginForm />);
    
    // Click login button without filling fields
    const loginButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(loginButton);
    
    // Check if validation errors are shown
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });
  
  it('shows validation error for invalid email format', async () => {
    render(<LoginForm />);
    
    // Fill email field with invalid format
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Fill password field
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Click login button
    const loginButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(loginButton);
    
    // Check if validation error is shown
    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });
});
