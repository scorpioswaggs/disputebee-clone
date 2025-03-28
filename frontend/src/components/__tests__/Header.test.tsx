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
    return '/';
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Import components to test
import Header from '@/components/Header';

describe('Header Component', () => {
  it('renders the logo and brand name', () => {
    render(<Header />);
    
    // Check if the brand name is rendered
    expect(screen.getByText('CrediSure')).toBeInTheDocument();
  });
  
  it('renders all navigation links', () => {
    render(<Header />);
    
    // Check if all navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  
  it('renders login and register buttons', () => {
    render(<Header />);
    
    // Check if login and register buttons are rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
  
  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    
    // Mobile menu should be hidden initially
    const mobileMenu = screen.queryByRole('menu');
    expect(mobileMenu).not.toBeVisible();
    
    // Click hamburger button
    const hamburgerButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(hamburgerButton);
    
    // Mobile menu should be visible after click
    expect(mobileMenu).toBeVisible();
    
    // Click again to hide
    fireEvent.click(hamburgerButton);
    
    // Mobile menu should be hidden again
    expect(mobileMenu).not.toBeVisible();
  });
});
