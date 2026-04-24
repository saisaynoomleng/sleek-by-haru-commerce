'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoadingSpinner } from './LoadingSpinner';

const SubmitButton = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="submit"
      aria-label="submit button"
      disabled={pending}
      className={className}
    >
      {pending ? (
        <span>
          <LoadingSpinner data-testid="spinner" />
        </span>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
};

export default SubmitButton;
