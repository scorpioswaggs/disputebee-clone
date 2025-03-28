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
    return '/dashboard/credit-reports/upload';
  },
}));

// Import components to test
import CreditReportUpload from '@/app/dashboard/credit-reports/upload/CreditReportUpload';

describe('CreditReportUpload Component', () => {
  it('renders the upload form with title', () => {
    render(<CreditReportUpload />);
    
    // Check if the title is rendered
    expect(screen.getByText('Upload Credit Report')).toBeInTheDocument();
    expect(screen.getByText('Upload your credit reports from all three bureaus')).toBeInTheDocument();
  });
  
  it('renders all credit bureau upload sections', () => {
    render(<CreditReportUpload />);
    
    // Check if all bureau sections are rendered
    expect(screen.getByText('Experian')).toBeInTheDocument();
    expect(screen.getByText('Equifax')).toBeInTheDocument();
    expect(screen.getByText('TransUnion')).toBeInTheDocument();
  });
  
  it('renders file upload buttons for each bureau', () => {
    render(<CreditReportUpload />);
    
    // Check if file upload buttons are rendered
    const uploadButtons = screen.getAllByText('Choose File');
    expect(uploadButtons.length).toBe(3);
  });
  
  it('renders submit button', () => {
    render(<CreditReportUpload />);
    
    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: 'Upload Reports' })).toBeInTheDocument();
  });
  
  it('shows validation error when trying to submit without files', async () => {
    render(<CreditReportUpload />);
    
    // Click submit button without uploading files
    const submitButton = screen.getByRole('button', { name: 'Upload Reports' });
    fireEvent.click(submitButton);
    
    // Check if validation error is shown
    expect(await screen.findByText('Please upload at least one credit report')).toBeInTheDocument();
  });
  
  it('displays file name after file selection', () => {
    render(<CreditReportUpload />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'experian-report.pdf', { type: 'application/pdf' });
    
    // Get the first file input
    const fileInput = screen.getAllByLabelText('Choose File')[0];
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if file name is displayed
    expect(screen.getByText('experian-report.pdf')).toBeInTheDocument();
  });
});
