import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './index';

// Mock the tRPC api import to avoid network calls
vi.mock('@/utils/api', () => ({
  api: {
    post: {
      hello: {
        useQuery: () => ({ data: { greeting: 'Hello from Vitest!' } })
      }
    }
  }
}));

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Create T3 App/i })).toBeInTheDocument();
  });

  it('renders the greeting from tRPC', () => {
    render(<Home />);
    expect(screen.getByText('Hello from Vitest!')).toBeInTheDocument();
  });
});
