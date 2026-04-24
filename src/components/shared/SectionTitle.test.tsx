import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import SectionTitle from './SectionTitle';

describe('Section Title', () => {
  it('should render correctly', () => {
    render(<SectionTitle>Sale of the week</SectionTitle>);

    const el = screen.getByText(/sale of the week/i);

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('text-fs-500', 'font-semibold');
    expect(el.tagName).toBe('H3');
  });

  it('should change tagname', () => {
    render(<SectionTitle as="h5">Test Title</SectionTitle>);

    const el = screen.getByText(/test title/i);

    expect(el.tagName).toBe('H5');
  });

  it.each(['font-bold', 'text-fs-800'])(
    'should add custom-class %s',
    (className) => {
      render(
        <SectionTitle className="font-bold text-fs-800">
          test title
        </SectionTitle>,
      );

      const el = screen.getByText(/test title/i);

      expect(el).toHaveClass(className);
    },
  );
});
