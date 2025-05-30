import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PopularRecipesGrid from '../../components/PopularRecipesGrid';
import useLocalStorageQuery from '../../hooks/useLocalStorageQuery';

// Mock the useLocalStorageQuery hook
vi.mock('../../hooks/useLocalStorageQuery');

// Mock the RecipeGridList component
vi.mock('../../components/RecipeGridList', () => ({
  default: ({ data, scrollSnap, limit, isLoading }: any) => (
    <div 
      data-testid="recipe-grid-list" 
      data-items={JSON.stringify(data)}
      data-scroll-snap={scrollSnap}
      data-limit={limit}
      data-loading={isLoading}
    >
      {isLoading ? 'Loading State' : `${data.length} recipes loaded`}
    </div>
  )
}));

describe('PopularRecipesGrid', () => {
  const mockMeals = [
    { 
      idMeal: '1', 
      strMeal: 'Pasta Carbonara', 
      strMealThumb: 'https://example.com/pasta.jpg' 
    },
    { 
      idMeal: '2', 
      strMeal: 'Chicken Curry', 
      strMealThumb: 'https://example.com/curry.jpg' 
    },
    { 
      idMeal: '3', 
      strMeal: 'Beef Tacos', 
      strMealThumb: '' 
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeletons when data is loading', () => {
    // Mock the hook to return loading state
    (useLocalStorageQuery as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    // Render with a query
    render(<PopularRecipesGrid query="Italian" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check that it's in loading state with 6 skeleton items (default limit)
    expect(gridList).toHaveAttribute('data-loading', 'true');
    
    // Check the data passed has default limit of skeleton items
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(6);
    expect(passedData[0].id).toMatch(/skeleton-\d/);
  });

  it('renders error message when there is an error', () => {
    // Mock the hook to return an error
    (useLocalStorageQuery as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API error')
    });

    // Render with a query
    render(<PopularRecipesGrid query="Italian" />);
    
    // Check for error message
    expect(screen.getByText('Error loading recipes')).toBeInTheDocument();
  });

  it('transforms and passes meal data correctly to RecipeGridList', () => {
    // Mock the hook to return data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<PopularRecipesGrid query="Italian" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check it's not in loading state
    expect(gridList.getAttribute('data-loading')).toBeFalsy();
    
    // Check the data passed has been transformed correctly
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(3);
    
    // Check first item's transformation
    expect(passedData[0].id).toBe('1');
    expect(passedData[0].title).toBe('Pasta Carbonara');
    expect(passedData[0].desc).toBe('Delicious and easy to make!');
    expect(passedData[0].img).toBe('https://example.com/pasta.jpg/small');
    
    // Check item with empty image path
    expect(passedData[2].img).toBeUndefined();
  });

  it('passes scrollSnap prop correctly', () => {
    // Mock the hook to return data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with scrollSnap=true
    render(<PopularRecipesGrid query="Italian" scrollSnap={true} />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check scrollSnap prop was passed
    expect(gridList).toHaveAttribute('data-scroll-snap', 'true');
  });

  it('respects custom limit prop', () => {
    // Mock the hook to return data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with custom limit
    render(<PopularRecipesGrid query="Italian" limit={4} />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check limit prop was passed
    expect(gridList).toHaveAttribute('data-limit', '4');
  });

  it('handles loading with custom limit', () => {
    // Mock the hook to return loading state
    (useLocalStorageQuery as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    // Render with custom limit
    render(<PopularRecipesGrid query="Italian" limit={3} />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check the data passed has custom limit of skeleton items
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(3);
  });

  it('handles empty meals array gracefully', () => {
    // Mock the hook to return empty meals array
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: [] },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<PopularRecipesGrid query="NonExistent" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check that an empty array is passed
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(0);
  });

  it('handles null meals gracefully', () => {
    // Mock the hook to return null meals (API returns null when no results)
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: null },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<PopularRecipesGrid query="NonExistent" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check that an empty array is passed
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(0);
  });
});
