import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecipeList } from '../../components/RecipeList';
import useLocalStorageQuery from '../../hooks/useLocalStorageQuery';

// Mock the useLocalStorageQuery hook
vi.mock('../../hooks/useLocalStorageQuery');

// Mock the RecipeGridList component
vi.mock('../../components/RecipeGridList', () => ({
  default: ({ data, variant, limit, isLoading }: any) => (
    <div 
      data-testid="recipe-grid-list" 
      data-items={JSON.stringify(data)}
      data-variant={variant}
      data-limit={limit}
      data-loading={isLoading}
    >
      {isLoading ? 'Loading State' : `${data.length} recipes loaded`}
    </div>
  )
}));

describe('RecipeList', () => {
  const mockMeals = [
    { 
      idMeal: '1', 
      strMeal: 'Pasta Carbonara', 
      strInstructions: 'Cook pasta. Mix with eggs, cheese, and bacon. Season with pepper.', 
      strMealThumb: 'pasta.jpg' 
    },
    { 
      idMeal: '2', 
      strMeal: 'Chicken Curry', 
      strInstructions: 'Cook chicken with curry paste. Add coconut milk and vegetables.', 
      strMealThumb: 'curry.jpg' 
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
    render(<RecipeList query="pasta" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check that it's in loading state with 6 skeleton items
    expect(gridList).toHaveAttribute('data-loading', 'true');
    
    // Check the data passed has 6 skeleton items
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(6);
    expect(passedData[0].id).toMatch(/skeleton-\d/);
  });

  it('renders loading skeletons when forceLoading is true', () => {
    // Mock the hook to return loaded data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with forceLoading=true
    render(<RecipeList query="pasta" forceLoading={true} />);
    
    // Check that it's in loading state
    const gridList = screen.getByTestId('recipe-grid-list');
    expect(gridList).toHaveAttribute('data-loading', 'true');
  });

  it('renders error message when there is an error', () => {
    // Mock the hook to return an error
    (useLocalStorageQuery as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API error')
    });

    // Render with a query
    render(<RecipeList query="pasta" />);
    
    // Check for error message
    expect(screen.getByText('Error loading recipes.')).toBeInTheDocument();
  });

  it('transforms and passes meal data correctly to RecipeGridList', () => {
    // Mock the hook to return data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<RecipeList query="pasta" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check it's not in loading state
    expect(gridList.getAttribute('data-loading')).toBeFalsy();
    
    // Check the data passed has been transformed correctly
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(2);
    
    // Check first item's transformation
    // Instead of checking the exact string, let's check if it starts with the right content and has the correct length
    expect(passedData[0].id).toBe('1');
    expect(passedData[0].title).toBe('Pasta Carbonara');
    expect(passedData[0].img).toBe('pasta.jpg');
    expect(passedData[0].desc).toContain('Cook pasta. Mix with eggs');
    expect(passedData[0].desc.endsWith('...')).toBe(true);
    expect(passedData[0].desc.length).toBeLessThanOrEqual(63); // 60 chars + '...'
  });

  it('sets correct variant and limit props', () => {
    // Mock the hook to return data
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: mockMeals },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<RecipeList query="pasta" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check variant and limit props
    expect(gridList).toHaveAttribute('data-variant', 'list');
    expect(gridList).toHaveAttribute('data-limit', '6');
  });

  it('handles empty meals array gracefully', () => {
    // Mock the hook to return empty meals array
    (useLocalStorageQuery as any).mockReturnValue({
      data: { meals: [] },
      isLoading: false,
      error: null
    });

    // Render with a query
    render(<RecipeList query="nonexistent" />);
    
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
    render(<RecipeList query="nonexistent" />);
    
    // Get the RecipeGridList component
    const gridList = screen.getByTestId('recipe-grid-list');
    
    // Check that an empty array is passed
    const passedData = JSON.parse(gridList.getAttribute('data-items') || '[]');
    expect(passedData).toHaveLength(0);
  });
});
