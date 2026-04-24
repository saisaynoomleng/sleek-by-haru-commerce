import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Bounded from './Bounded';

describe('Bounded', () => {
  it('should render correctly', () => {
    render(
      <Bounded>
        <p>Test Content</p>
      </Bounded>,
    );

    const el = screen.getByText(/test content/i);
    const parent = el.parentElement;

    expect(el).toBeInTheDocument();
    expect(parent?.tagName).toBe('SECTION');
  });

  it.each([
    'py-5',
    'md:py-8',
    'lg:py-12',
    'space-y-8',
    'md:space-y-10',
    'lg:space-y-12',
    'min-h-screen',
  ])('should have class %s', (className) => {
    render(
      <Bounded>
        <p>Test Content</p>
      </Bounded>,
    );

    const el = screen.getByText(/test content/i).parentElement;

    expect(el).toHaveClass(className);
  });

  it.each(['px-5', 'md:px-8', 'lg:px-10'])(
    'should have class %s when isPadded is on',
    (className) => {
      render(
        <Bounded isPadded>
          <p>Test Content</p>
        </Bounded>,
      );

      const el = screen.getByText(/test content/i).parentElement;

      expect(el).toHaveClass(className);
    },
  );

  it('should have correct tagname', () => {
    render(
      <Bounded as="main">
        <p>Test Content</p>
      </Bounded>,
    );

    const el = screen.getByText(/test content/i).parentElement;

    expect(el?.tagName).toBe('MAIN');
  });

  it.each(['font-semibold', 'text-fs-500', 'leading-normal'])(
    'should have modified class %s',
    (className) => {
      render(
        <Bounded className="font-semibold text-fs-500 leading-normal ">
          <p>Test Content</p>
        </Bounded>,
      );

      const el = screen.getByText(/test content/i).parentElement;

      expect(el).toHaveClass(className);
    },
  );
});
