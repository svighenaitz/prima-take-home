import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PageHeader from '../../components/PageHeader';
import { useRouter } from 'next/router';

// Create a mockRouter object that can be customized in tests
const mockRouter = {
  back: vi.fn()
};

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => mockRouter
}));

describe('PageHeader', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    mockRouter.back = vi.fn();
  });

  it('renders the title correctly', () => {
    // Arrange
    const title = 'Page Title';
    
    // Act
    render(<PageHeader>{title}</PageHeader>);
    
    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('uses the correct heading level - h1 by default', () => {
    // Arrange
    const title = 'Page Title';
    
    // Act
    render(<PageHeader>{title}</PageHeader>);
    
    // Assert
    const heading = screen.getByText(title);
    expect(heading.tagName).toBe('H1');
  });

  it('uses the correct heading level - h2', () => {
    // Arrange
    const title = 'Page Title';
    
    // Act
    render(<PageHeader headingLevel="h2">{title}</PageHeader>);
    
    // Assert
    const heading = screen.getByText(title);
    expect(heading.tagName).toBe('H2');
  });

  it('uses the correct heading level - h3', () => {
    // Arrange
    const title = 'Page Title';
    
    // Act
    render(<PageHeader headingLevel="h3">{title}</PageHeader>);
    
    // Assert
    const heading = screen.getByText(title);
    expect(heading.tagName).toBe('H3');
  });

  it('shows back button when showBack is true', () => {
    // Arrange & Act
    render(<PageHeader showBack>{`Page Title`}</PageHeader>);
    
    // Assert
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });

  it('does not show back button by default', () => {
    // Arrange & Act
    render(<PageHeader>{`Page Title`}</PageHeader>);
    
    // Assert
    expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
  });

  it('calls router.back when back button is clicked', () => {
    // Arrange
    render(<PageHeader showBack>{`Page Title`}</PageHeader>);
    
    // Act
    fireEvent.click(screen.getByLabelText('Go back'));
    
    // Assert
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('renders right element when provided', () => {
    // Arrange
    const rightElement = <button>Action</button>;
    
    // Act
    render(<PageHeader rightElement={rightElement}>{`Page Title`}</PageHeader>);
    
    // Assert
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    // Arrange
    const customClass = 'custom-header-class';
    
    // Act
    const { container } = render(
      <PageHeader className={customClass}>{`Page Title`}</PageHeader>
    );
    
    // Assert
    const header = container.querySelector('header');
    expect(header).toHaveClass(customClass);
  });

  it('combines all props correctly', () => {
    // Arrange
    const title = 'Complex Header';
    const customClass = 'complex-class';
    const rightElement = <span data-testid="right-element">Right</span>;
    
    // Act
    render(
      <PageHeader 
        className={customClass} 
        showBack={true} 
        rightElement={rightElement}
        headingLevel="h2"
      >
        {title}
      </PageHeader>
    );
    
    // Assert
    expect(screen.getByText(title).tagName).toBe('H2');
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    expect(screen.getByTestId('right-element')).toBeInTheDocument();
    const header = screen.getByRole('banner');
    expect(header).toHaveClass(customClass);
  });
});
