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
    return '/dashboard/disputes';
  },
}));

// Import components to test
import DisputeForm from '@/app/dashboard/disputes/DisputeForm';

describe('DisputeForm Component', () => {
  it('renders the dispute form with title', () => {
    render(<DisputeForm />);
    
    // Check if the title is rendered
    expect(screen.getByText('Create New Dispute')).toBeInTheDocument();
  });
  
  it('renders all form sections', () => {
    render(<DisputeForm />);
    
    // Check if all sections are rendered
    expect(screen.getByText('Dispute Type')).toBeInTheDocument();
    expect(screen.getByText('Credit Bureau')).toBeInTheDocument();
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Dispute Reason')).toBeInTheDocument();
    expect(screen.getByText('Letter Format')).toBeInTheDocument();
  });
  
  it('renders all dispute type options', () => {
    render(<DisputeForm />);
    
    // Check if all dispute type options are rendered
    expect(screen.getByLabelText('Late Payment')).toBeInTheDocument();
    expect(screen.getByLabelText('Collection Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Hard Inquiry')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Not Mine')).toBeInTheDocument();
    expect(screen.getByLabelText('Incorrect Balance')).toBeInTheDocument();
  });
  
  it('renders all credit bureau options', () => {
    render(<DisputeForm />);
    
    // Check if all credit bureau options are rendered
    expect(screen.getByLabelText('Experian')).toBeInTheDocument();
    expect(screen.getByLabelText('Equifax')).toBeInTheDocument();
    expect(screen.getByLabelText('TransUnion')).toBeInTheDocument();
    expect(screen.getByLabelText('All Bureaus')).toBeInTheDocument();
  });
  
  it('renders letter format options', () => {
    render(<DisputeForm />);
    
    // Check if letter format options are rendered
    expect(screen.getByLabelText('Metro 2 Compliant')).toBeInTheDocument();
    expect(screen.getByLabelText('FCRA/FTC/FDCPA-Based')).toBeInTheDocument();
  });
  
  it('renders submit button', () => {
    render(<DisputeForm />);
    
    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: 'Generate Dispute Letter' })).toBeInTheDocument();
  });
  
  it('shows validation errors for required fields on submit', async () => {
    render(<DisputeForm />);
    
    // Click submit button without filling required fields
    const submitButton = screen.getByRole('button', { name: 'Generate Dispute Letter' });
    fireEvent.click(submitButton);
    
    // Check if validation errors are shown
    expect(await screen.findByText('Please select a dispute type')).toBeInTheDocument();
    expect(await screen.findByText('Please select at least one credit bureau')).toBeInTheDocument();
    expect(await screen.findByText('Account information is required')).toBeInTheDocument();
    expect(await screen.findByText('Please provide a dispute reason')).toBeInTheDocument();
    expect(await screen.findByText('Please select a letter format')).toBeInTheDocument();
  });
});
