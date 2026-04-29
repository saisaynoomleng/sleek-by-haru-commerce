'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoadingSpinner } from './LoadingSpinner';

const SubmitButton = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
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
        <span>{children}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
