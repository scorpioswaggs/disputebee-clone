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
    return '/dashboard';
  },
}));

// Import components to test
import DashboardSidebar from '@/components/DashboardSidebar';

describe('DashboardSidebar Component', () => {
  it('renders the sidebar with user portal title', () => {
    render(<DashboardSidebar />);
    
    // Check if the title is rendered
    expect(screen.getByText('CrediSure')).toBeInTheDocument();
    expect(screen.getByText('User Portal')).toBeInTheDocument();
  });
  
  it('renders all main navigation sections', () => {
    render(<DashboardSidebar />);
    
    // Check if all main sections are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Credit Reports')).toBeInTheDocument();
    expect(screen.getByText('Disputes')).toBeInTheDocument();
    expect(screen.getByText('Score Simulator')).toBeInTheDocument();
    expect(screen.getByText('Learning Center')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
  });
  
  it('renders all subsection links', () => {
    render(<DashboardSidebar />);
    
    // Check if credit reports subsections are rendered
    expect(screen.getByText('My Reports')).toBeInTheDocument();
    expect(screen.getByText('Upload New')).toBeInTheDocument();
    
    // Check if disputes subsections are rendered
    expect(screen.getByText('Active Disputes')).toBeInTheDocument();
    expect(screen.getByText('Create New')).toBeInTheDocument();
    expect(screen.getByText('Dispute History')).toBeInTheDocument();
  });
  
  it('renders logout button', () => {
    render(<DashboardSidebar />);
    
    // Check if logout button is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
