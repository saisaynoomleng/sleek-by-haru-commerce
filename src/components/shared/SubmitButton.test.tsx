import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';
import { useFormStatus } from 'react-dom';

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    useFormStatus: vi.fn(),
  };
});

describe('Submit Button', () => {
  it('should render correctly', () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: false,
      data: null,
      method: null,
      action: null,
    });

    render(<SubmitButton>Submit</SubmitButton>);

    const el = screen.getByRole('button', { name: /submit button/i });
    const submitText = screen.getByText(/submit/i);

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('bg-brand-black-200');
    expect(submitText).toBeInTheDocument();
    expect(el).not.toBeDisabled();
  });

  it('should be disabled and have spinner while pending', () => {
    vi.mocked(useFormStatus).mockReturnValue({
      pending: true,
      data: new FormData(),
      method: 'post',
      action: vi.fn() as unknown as (fromData: FormData) => void,
    });

    render(<SubmitButton>Submit</SubmitButton>);

    const el = screen.getByRole('button', { name: /submit button/i });
    const spinner = screen.getByTestId('spinner');

    expect(el).toBeInTheDocument();
    expect(el).toBeDisabled();
    expect(spinner).toBeInTheDocument();
  });
});
