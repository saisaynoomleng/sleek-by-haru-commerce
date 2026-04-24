'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoadingSpinner } from './LoadingSpinner';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="submit"
      aria-label="submit button"
      disabled={pending}
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
