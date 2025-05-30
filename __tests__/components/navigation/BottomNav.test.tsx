import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BottomNav } from '../../../components/navigation/BottomNav';
import { useRouter } from 'next/router';

// Create a mockRouter object that can be customized in tests
const mockRouter = {
  pathname: '/'
};

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => mockRouter
}));

// Mock next/link to render as a normal anchor in tests
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe('BottomNav', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    mockRouter.pathname = '/';
  });

  it('renders all navigation items', () => {
    // Arrange & Act
    render(<BottomNav />);
    
    // Assert - check all nav items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('marks the home item as active when on home page', () => {
    // Arrange
    mockRouter.pathname = '/';
    
    // Act
    render(<BottomNav />);
    
    // Assert
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).toHaveClass('text-[#4A4142]');
    expect(homeLink).toHaveClass('bg-gray-100');
    expect(screen.getByText('(current page)')).toBeInTheDocument();
  });

  it('marks the explore item as active when on explore page', () => {
    // Arrange
    mockRouter.pathname = '/explore';
    
    // Act
    render(<BottomNav />);
    
    // Assert
    const exploreLink = screen.getByText('Explore').closest('a');
    expect(exploreLink).toHaveAttribute('aria-current', 'page');
    expect(exploreLink).toHaveClass('text-[#4A4142]');
    expect(exploreLink).toHaveClass('bg-gray-100');
    expect(screen.getByText('(current page)')).toBeInTheDocument();
  });

  it('marks the saved item as active when on saved page', () => {
    // Arrange
    mockRouter.pathname = '/saved';
    
    // Act
    render(<BottomNav />);
    
    // Assert
    const savedLink = screen.getByText('Saved').closest('a');
    expect(savedLink).toHaveAttribute('aria-current', 'page');
    expect(savedLink).toHaveClass('text-[#4A4142]');
    expect(savedLink).toHaveClass('bg-gray-100');
    expect(screen.getByText('(current page)')).toBeInTheDocument();
  });

  it('renders the correct links with href attributes', () => {
    // Arrange & Act
    render(<BottomNav />);
    
    // Assert
    const homeLink = screen.getByText('Home').closest('a');
    const exploreLink = screen.getByText('Explore').closest('a');
    const savedLink = screen.getByText('Saved').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(exploreLink).toHaveAttribute('href', '/explore');
    expect(savedLink).toHaveAttribute('href', '/saved');
  });

  it('renders icons for each navigation item', () => {
    // Arrange & Act
    render(<BottomNav />);
    
    // Assert
    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(3);
    
    // Each link should have an SVG icon
    navLinks.forEach(link => {
      const svg = link.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('has appropriate accessibility attributes', () => {
    // Arrange & Act
    render(<BottomNav />);
    
    // Assert
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    // SVGs should be properly hidden from screen readers
    const svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('focusable', 'false');
    });
  });

  it('applies inactive styling to non-active items', () => {
    // Arrange
    mockRouter.pathname = '/';
    
    // Act
    render(<BottomNav />);
    
    // Assert
    const exploreLink = screen.getByText('Explore').closest('a');
    const savedLink = screen.getByText('Saved').closest('a');
    
    expect(exploreLink).not.toHaveAttribute('aria-current');
    expect(savedLink).not.toHaveAttribute('aria-current');
    
    expect(exploreLink).toHaveClass('text-gray-500');
    expect(savedLink).toHaveClass('text-gray-500');
    
    expect(exploreLink).not.toHaveClass('text-[#4A4142]');
    expect(exploreLink).not.toHaveClass('bg-gray-100');
    expect(savedLink).not.toHaveClass('text-[#4A4142]');
    expect(savedLink).not.toHaveClass('bg-gray-100');
  });
});
