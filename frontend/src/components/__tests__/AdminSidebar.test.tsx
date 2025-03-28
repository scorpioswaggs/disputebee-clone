import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Import components to test
import AdminSidebar from '@/components/AdminSidebar';

describe('AdminSidebar Component', () => {
  it('renders the sidebar with title', () => {
    render(<AdminSidebar />);
    
    // Check if the title is rendered
    expect(screen.getByText('CrediSure Admin')).toBeInTheDocument();
    expect(screen.getByText('Management Dashboard')).toBeInTheDocument();
  });
  
  it('renders all main navigation sections', () => {
    render(<AdminSidebar />);
    
    // Check if all main sections are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Dispute Management')).toBeInTheDocument();
    expect(screen.getByText('Content Management')).toBeInTheDocument();
    expect(screen.getByText('Billing & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
  
  it('renders all subsection links', () => {
    render(<AdminSidebar />);
    
    // Check if user management subsections are rendered
    expect(screen.getByText('All Users')).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    
    // Check if dispute management subsections are rendered
    expect(screen.getByText('All Disputes')).toBeInTheDocument();
    expect(screen.getByText('Letter Templates')).toBeInTheDocument();
    
    // Check if content management subsections are rendered
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    
    // Check if billing & analytics subsections are rendered
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    
    // Check if settings subsections are rendered
    expect(screen.getByText('General Settings')).toBeInTheDocument();
    expect(screen.getByText('Admin Users')).toBeInTheDocument();
  });
  
  it('renders logout button', () => {
    render(<AdminSidebar />);
    
    // Check if logout button is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
