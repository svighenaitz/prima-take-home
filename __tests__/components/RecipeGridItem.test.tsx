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
});
