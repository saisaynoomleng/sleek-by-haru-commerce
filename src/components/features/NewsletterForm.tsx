'use client';

import clsx from 'clsx';
import SectionTitle from '../shared/SectionTitle';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { handleNewsletterForm } from '@/actions/handleNewsletterForm';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import Link from 'next/link';

const initialFormState = {
  success: false,
  message: '',
  field: '',
};

const NewsletterForm = ({ className }: { className?: string }) => {
  const [state, actionFunction] = useActionState(
    handleNewsletterForm,
    initialFormState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <div className={clsx('flex flex-col gap-y-3', className)}>
      <SectionTitle as="h5">Subscribe to get 10% OFF</SectionTitle>

      <p className="text-brand-black-100/50">
        Subscribe for store updates and discounts
      </p>

      <Form action={actionFunction} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            autoComplete="email"
          />
          <p className="text-fs-200">
            By subscribing you agree to the{' '}
            <Link href="/terms-and-conditions" className="underline">
              Terms of Use
            </Link>{' '}
            &{' '}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <SubmitButton>Subscribe</SubmitButton>
      </Form>
    </div>
  );
};

export default NewsletterForm;
