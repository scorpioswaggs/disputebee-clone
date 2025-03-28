import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    return '/dashboard/score-simulator';
  },
}));

// Import components to test
import ScoreSimulator from '@/app/dashboard/score-simulator/ScoreSimulator';

describe('ScoreSimulator Component', () => {
  it('renders the score simulator with title', () => {
    render(<ScoreSimulator />);
    
    // Check if the title is rendered
    expect(screen.getByText('Credit Score Simulator')).toBeInTheDocument();
    expect(screen.getByText('See how different actions could affect your credit score')).toBeInTheDocument();
  });
  
  it('renders current score section', () => {
    render(<ScoreSimulator />);
    
    // Check if current score section is rendered
    expect(screen.getByText('Current Score')).toBeInTheDocument();
    expect(screen.getByText('720')).toBeInTheDocument(); // Assuming default score is 720
  });
  
  it('renders simulation actions section', () => {
    render(<ScoreSimulator />);
    
    // Check if simulation actions section is rendered
    expect(screen.getByText('Simulation Actions')).toBeInTheDocument();
    
    // Check if common actions are listed
    expect(screen.getByText('Pay off credit card balance')).toBeInTheDocument();
    expect(screen.getByText('Remove a late payment')).toBeInTheDocument();
    expect(screen.getByText('Remove a collection account')).toBeInTheDocument();
    expect(screen.getByText('Apply for new credit')).toBeInTheDocument();
    expect(screen.getByText('Increase credit limit')).toBeInTheDocument();
  });
  
  it('renders simulate button', () => {
    render(<ScoreSimulator />);
    
    // Check if simulate button is rendered
    expect(screen.getByRole('button', { name: 'Simulate Changes' })).toBeInTheDocument();
  });
  
  it('updates simulated score when actions are selected and simulate button is clicked', async () => {
    render(<ScoreSimulator />);
    
    // Select some actions
    const payOffBalanceCheckbox = screen.getByLabelText('Pay off credit card balance');
    const removeLatePaymentCheckbox = screen.getByLabelText('Remove a late payment');
    
    fireEvent.click(payOffBalanceCheckbox);
    fireEvent.click(removeLatePaymentCheckbox);
    
    // Click simulate button
    const simulateButton = screen.getByRole('button', { name: 'Simulate Changes' });
    fireEvent.click(simulateButton);
    
    // Check if simulated score is updated
    await waitFor(() => {
      expect(screen.getByText('Simulated Score')).toBeInTheDocument();
      // The exact score will depend on the implementation, but it should be higher than 720
      const simulatedScoreElement = screen.getByTestId('simulated-score');
      const simulatedScore = parseInt(simulatedScoreElement.textContent);
      expect(simulatedScore).toBeGreaterThan(720);
    });
  });
  
  it('shows score impact for each selected action', async () => {
    render(<ScoreSimulator />);
    
    // Select an action
    const payOffBalanceCheckbox = screen.getByLabelText('Pay off credit card balance');
    fireEvent.click(payOffBalanceCheckbox);
    
    // Click simulate button
    const simulateButton = screen.getByRole('button', { name: 'Simulate Changes' });
    fireEvent.click(simulateButton);
    
    // Check if score impact is shown
    await waitFor(() => {
      expect(screen.getByText(/Estimated Impact/i)).toBeInTheDocument();
      // The exact impact will depend on the implementation, but it should be positive
      const impactElement = screen.getByTestId('impact-pay-off-balance');
      expect(impactElement.textContent).toMatch(/\+\d+/); // Should show something like "+15"
    });
  });
});
