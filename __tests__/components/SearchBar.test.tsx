import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from '../../components/SearchBar';
import { useRouter } from 'next/router';

// Create a mockRouter object that can be customized in tests
const mockRouter = {
  pathname: '/',
  push: vi.fn(),
};

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('SearchBar', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    mockRouter.pathname = '/';
    mockRouter.push = vi.fn();
  });

  it('renders with default placeholder', () => {
    // Arrange & Act
    render(<SearchBar />);
    
    // Assert
    expect(screen.getByPlaceholderText('Search for recipes')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    // Arrange
    const customPlaceholder = 'Custom placeholder';
    
    // Act
    render(<SearchBar placeholder={customPlaceholder} />);
    
    // Assert
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it('shows the provided value', () => {
    // Arrange
    const value = 'pasta';
    
    // Act
    render(<SearchBar value={value} />);
    
    // Assert
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('calls onChange when input changes on explore page', () => {
    // Arrange
    const handleChange = vi.fn();
    mockRouter.pathname = '/explore';
    
    // Act
    render(<SearchBar onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'pasta' } });
    
    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('redirects to explore page when typing on non-explore page', () => {
    // Arrange
    const mockPush = vi.fn();
    mockRouter.pathname = '/';
    mockRouter.push = mockPush;
    
    // Act
    render(<SearchBar />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'pasta' } });
    
    // Assert
    expect(mockPush).toHaveBeenCalledWith('/explore?query=pasta');
  });

  it('does not redirect if input is less than 3 characters', () => {
    // Arrange
    const mockPush = vi.fn();
    mockRouter.pathname = '/';
    mockRouter.push = mockPush;
    
    // Act
    render(<SearchBar />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'pa' } });
    
    // Assert
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('auto-focuses the input when autoFocus is true', () => {
    // Arrange & Act
    render(<SearchBar autoFocus={true} />);
    
    // Assert
    expect(document.activeElement).toBe(screen.getByRole('textbox'));
  });

  it('updates the internal state when the value prop changes', () => {
    // Arrange
    const { rerender } = render(<SearchBar value="initial" />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    // Act
    rerender(<SearchBar value="updated" />);
    
    // Assert
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });
});
