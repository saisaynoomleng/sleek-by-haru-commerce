import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SanityImage from './SanityImage';
import { afterEach } from 'node:test';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('@/sanity/lib/image', () => ({
  urlFor: () => ({
    format: () => ({
      url: () => 'https://test-image.jpg',
    }),
  }),
}));

vi.mock('@/sanity/env', () => ({
  apiVersion: '2026-04-23',
  dataset: 'test',
  projectId: 'test',
  useCdn: false,
}));

describe('SanityImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should render image correctly', () => {
    render(
      <SanityImage
        alt="text alt"
        imageUrl="test"
        width={300}
        height={300}
        className="bg-brand-white-100"
      />,
    );

    const img = screen.getByAltText('text alt');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://test-image.jpg');
    expect(img).toHaveAttribute('width', '300');
    expect(img).toHaveAttribute('height', '300');

    expect(img).toHaveClass('object-cover', 'min-w-full', 'bg-brand-white-100');
  });
});
