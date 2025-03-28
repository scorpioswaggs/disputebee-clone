import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

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

// Mock API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
    ok: true,
  })
);

// Import components to test
import App from '@/app/page';

describe('Integration Test - Home Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the home page with all sections', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Check if hero section is rendered
    expect(screen.getByText('Take Control of Your Credit Journey')).toBeInTheDocument();
    expect(screen.getByText('Empowering you to dispute inaccurate information and improve your credit score')).toBeInTheDocument();
    
    // Check if feature section is rendered
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    
    // Check if testimonials section is rendered
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
    
    // Check if pricing section is rendered
    expect(screen.getByText('Choose Your Plan')).toBeInTheDocument();
    
    // Check if CTA section is rendered
    expect(screen.getByText('Ready to Take Control of Your Credit?')).toBeInTheDocument();
  });

  it('navigates to registration page when "Get Started" button is clicked', async () => {
    const mockRouter = require('next/navigation').useRouter();
    
    await act(async () => {
      render(<App />);
    });
    
    // Find and click the "Get Started" button
    const getStartedButton = screen.getByRole('link', { name: /Get Started/i });
    fireEvent.click(getStartedButton);
    
    // Check if router.push was called with the correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/register');
  });

  it('shows all three pricing plans', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Check if all pricing plans are rendered
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    
    // Check if pricing information is displayed
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('displays the three-step process', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Check if all steps are rendered
    expect(screen.getByText('Upload Your Credit Report')).toBeInTheDocument();
    expect(screen.getByText('Generate Dispute Letters')).toBeInTheDocument();
    expect(screen.getByText('Track Your Progress')).toBeInTheDocument();
  });
});
