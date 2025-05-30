import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecipeGridItem from 'components/RecipeGridItem';

describe('RecipeGridItem', () => {
  it('renders the title and description', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
    expect(screen.getByText('A classic Italian pasta dish')).toBeInTheDocument();
  });

  it('renders the image when provided', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
      img: 'https://example.com/pasta.jpg',
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    const image = screen.getByAltText('Recipe for Pasta Carbonara');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/pasta.jpg');
  });

  it('renders a placeholder when no image is provided', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    expect(screen.getByRole('img', { name: 'Recipe image placeholder' })).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
      className: 'custom-class',
    };

    // Act
    const { container } = render(<RecipeGridItem {...props} />);

    // Assert
    const article = container.querySelector('article');
    expect(article).toHaveClass('custom-class');
  });

  it('renders in loading state when isLoading is true', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
      isLoading: true,
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    expect(screen.getByLabelText('Loading recipe image')).toBeInTheDocument();
    // Verify that the title and description are not rendered in loading state
    expect(screen.queryByText('Pasta Carbonara')).not.toBeInTheDocument();
    expect(screen.queryByText('A classic Italian pasta dish')).not.toBeInTheDocument();
    // Check for skeleton elements
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays time and servings when both are provided', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
      time: '30 min',
      servings: '4 servings',
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    expect(screen.getByText(/30 min/)).toBeInTheDocument();
    expect(screen.getByText(/4 servings/)).toBeInTheDocument();
    // Check for the bullet point separator
    const paragraph = screen.getByText(/30 min.*4 servings/s);
    expect(paragraph.textContent).toMatch(/•/);
  });

  it('does not display time and servings section when neither is provided', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    const timeServingsText = screen.queryByText(/•/);
    expect(timeServingsText).not.toBeInTheDocument();
  });

  it('shows skeleton for time and servings in loading state when they would be shown', () => {
    // Arrange
    const props = {
      title: 'Pasta Carbonara',
      desc: 'A classic Italian pasta dish',
      time: '30 min',
      servings: '4 servings',
      isLoading: true,
    };

    // Act
    render(<RecipeGridItem {...props} />);

    // Assert
    // Should have at least 3 skeleton elements (image, title, desc) plus one for time/servings
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThanOrEqual(4);
  });
});
