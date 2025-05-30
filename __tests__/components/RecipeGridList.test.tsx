import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecipeGridList from '../../components/RecipeGridList';
import type { RecipeGridListItem } from '../../components/RecipeGridList';

// Mock the RecipeGridItem component
vi.mock('../../components/RecipeGridItem', () => ({
  default: ({ title, desc, isLoading, className }: any) => (
    <div 
      data-testid="recipe-grid-item" 
      data-title={title}
      data-desc={desc}
      data-loading={isLoading}
      className={className}
    >
      {isLoading ? 'Loading...' : title}
    </div>
  )
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe('RecipeGridList', () => {
  // Sample data for testing
  const mockItems: RecipeGridListItem[] = [
    { id: '1', title: 'Pasta Carbonara', desc: 'Italian classic', img: 'pasta.jpg' },
    { id: '2', title: 'Margherita Pizza', desc: 'Simple and delicious', img: 'pizza.jpg' },
    { id: '3', title: 'Chicken Curry', desc: 'Spicy and flavorful', img: 'curry.jpg' },
    { id: '4', title: 'Caesar Salad', desc: 'Healthy option', img: 'salad.jpg' },
    { id: '5', title: 'Beef Tacos', desc: 'Mexican favorite', img: 'tacos.jpg' },
    { id: '6', title: 'Chocolate Cake', desc: 'Sweet dessert', img: 'cake.jpg' },
    { id: '7', title: 'Sushi Rolls', desc: 'Japanese delicacy', img: 'sushi.jpg' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders in grid mode by default', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} />);
    
    // Assert
    const container = screen.getByRole('link', { name: /View recipe details for Pasta Carbonara/i }).parentElement;
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('grid-cols-2');
    expect(container).not.toHaveClass('flex');
  });

  it('limits the number of items to the specified limit', () => {
    // Arrange & Act
    const limit = 3;
    render(<RecipeGridList data={mockItems} limit={limit} />);
    
    // Assert
    const items = screen.getAllByTestId('recipe-grid-item');
    expect(items).toHaveLength(limit);
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Chicken Curry')).toBeInTheDocument();
    expect(screen.queryByText('Caesar Salad')).not.toBeInTheDocument();
  });

  it('uses the default limit of 6 when not specified', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} />);
    
    // Assert
    const items = screen.getAllByTestId('recipe-grid-item');
    expect(items).toHaveLength(6);
    expect(screen.queryByText('Sushi Rolls')).not.toBeInTheDocument();
  });

  it('renders in scroll snap mode when scrollSnap is true', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} scrollSnap={true} />);
    
    // Assert
    // Check container classes
    const container = screen.getByRole('region', { name: 'Scrollable recipes gallery' });
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('overflow-x-auto');
    expect(container).toHaveClass('snap-x');
    
    // Check that the item classes are passed correctly to RecipeGridItem
    const items = screen.getAllByTestId('recipe-grid-item');
    items.forEach(item => {
      expect(item.className).toContain('flex-shrink-0');
      expect(item.className).toContain('snap-center');
    });
  });

  it('adds accessibility attributes for scrollable content', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} scrollSnap={true} />);
    
    // Assert
    const container = screen.getByRole('region');
    expect(container).toHaveAttribute('aria-label', 'Scrollable recipes gallery');
    expect(container).toHaveAttribute('tabindex', '0');
  });

  it('renders in list mode when variant is list', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} variant="list" />);
    
    // Assert
    const list = screen.getByRole('list', { name: 'Recipe list' });
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe('UL');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(6); // Default limit
  });

  it('displays loading state in grid mode', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} isLoading={true} />);
    
    // Assert
    const loadingItems = screen.getAllByTestId('recipe-grid-item');
    loadingItems.forEach(item => {
      expect(item).toHaveAttribute('data-loading', 'true');
    });
  });

  it('displays loading state in list mode', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} variant="list" isLoading={true} />);
    
    // Assert
    const loadingImgs = screen.getAllByRole('img', { name: 'Loading recipe image' });
    expect(loadingImgs).toHaveLength(6); // Default limit
  });

  it('creates correct links to recipe details', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} />);
    
    // Assert
    const links = screen.getAllByRole('link');
    // Check only the first 6 links (default limit) to avoid out-of-bounds error
    for (let i = 0; i < Math.min(links.length, mockItems.length); i++) {
      expect(links[i]).toHaveAttribute('href', `/explore/id/${mockItems[i]!.id}`);
    }
  });

  it('handles empty data array gracefully', () => {
    // Arrange & Act
    render(<RecipeGridList data={[]} />);
    
    // Assert
    const items = screen.queryAllByTestId('recipe-grid-item');
    expect(items).toHaveLength(0);
  });

  it('passes className to grid items in scrollSnap mode', () => {
    // Arrange & Act
    render(<RecipeGridList data={mockItems} scrollSnap={true} />);
    
    // Assert
    const items = screen.getAllByTestId('recipe-grid-item');
    items.forEach(item => {
      // Check for all the classes that should be applied to items
      expect(item.className).toContain('flex-shrink-0');
      expect(item.className).toContain('snap-center');
      expect(item.className).toContain('min-w-[50vw]');
      expect(item.className).toContain('w-full');
      expect(item.className).toContain('h-full');
    });
  });
});
