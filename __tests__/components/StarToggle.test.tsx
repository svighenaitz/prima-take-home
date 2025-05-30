import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StarToggle from '../../components/StarToggle';

describe('StarToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders an empty star by default', () => {
    // Arrange & Act
    render(<StarToggle />);
    
    // Assert
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeInTheDocument();
    // Check for the empty star SVG (stroke but no fill)
    const svg = button.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'black');
  });

  it('renders a filled star when initialFilled is true', () => {
    // Arrange & Act
    render(<StarToggle initialFilled={true} />);
    
    // Assert
    const button = screen.getByRole('button', { name: 'Unsave' });
    expect(button).toBeInTheDocument();
    // Check for the filled star SVG
    const svg = button.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'black');
  });

  it('renders a filled star when filled prop is true', () => {
    // Arrange & Act
    render(<StarToggle filled={true} />);
    
    // Assert
    const button = screen.getByRole('button', { name: 'Unsave' });
    const svg = button.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'black');
  });

  it('toggles the star when clicked (uncontrolled mode)', () => {
    // Arrange
    render(<StarToggle />);
    const button = screen.getByRole('button');
    
    // Act - click to fill
    fireEvent.click(button);
    
    // Assert - should now be filled
    expect(button).toHaveAttribute('aria-label', 'Unsave');
    let svg = button.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'black');
    
    // Act - click again to unfill
    fireEvent.click(button);
    
    // Assert - should now be empty
    expect(button).toHaveAttribute('aria-label', 'Save');
    svg = button.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('calls onToggle when clicked (uncontrolled mode)', () => {
    // Arrange
    const handleToggle = vi.fn();
    render(<StarToggle onToggle={handleToggle} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(true);
    
    // Act - click again
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(2);
    expect(handleToggle).toHaveBeenLastCalledWith(false);
  });

  it('calls onToggle when clicked (controlled mode)', () => {
    // Arrange
    const handleToggle = vi.fn();
    const { rerender } = render(<StarToggle filled={false} onToggle={handleToggle} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(true);
    
    // Simulate parent component updating the prop
    rerender(<StarToggle filled={true} onToggle={handleToggle} />);
    
    // Act - click again
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(handleToggle).toHaveBeenCalledTimes(2);
    expect(handleToggle).toHaveBeenLastCalledWith(false);
  });

  it('does not update internal state when in controlled mode', () => {
    // Arrange
    const { rerender } = render(<StarToggle filled={false} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert - button should still show empty star because we didn't update the filled prop
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Save');
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'none');
    
    // Update the controlled prop
    rerender(<StarToggle filled={true} />);
    
    // Assert - now it should be filled
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Unsave');
    const filledSvg = screen.getByRole('button').querySelector('svg');
    expect(filledSvg).toHaveAttribute('fill', 'black');
  });

  it('applies custom className', () => {
    // Arrange & Act
    render(<StarToggle className="custom-class" />);
    
    // Assert
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('initializes with initialFilled value', () => {
    // Arrange & Act
    render(<StarToggle initialFilled={true} />);
    
    // Assert
    const button = screen.getByRole('button', { name: 'Unsave' });
    expect(button).toBeInTheDocument();
  });
});
