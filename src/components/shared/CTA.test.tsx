import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import CTA from './CTA';

describe('CTA', () => {
  it('should render correctly', () => {
    render(<CTA href="/about-us" />);

    const el = screen.getByRole('link', { name: /call to action/i });

    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('href', '/about-us');
  });

  it('should render arrow icon', async () => {
    render(<CTA href="/home" />);

    const el = screen.getByRole('link', { name: /call to action/i });

    const icon = el.querySelector('svg');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('-rotate-45');
  });
});
