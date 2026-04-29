'use client';

import { handleUpdateUserNameForm } from '@/actions/handleUpdateUserNameForm';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import { redirect } from 'next/navigation';

const UpdateUserNameForm = () => {
  const [state, actionFunction] = useActionState(handleUpdateUserNameForm, {
    success: false,
    message: '',
    field: '',
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      redirect('/user');
    }

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <Form action={actionFunction} className="flex flex-col gap-y-2">
      <div className="space-y-1">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          autoComplete="given-name"
        />
        {!state.success && state.field === 'firstName' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          autoComplete="family-name"
        />
        {!state.success && state.field === 'lastName' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <SubmitButton className="self-start">Save Changes</SubmitButton>
    </Form>
  );
};

export default UpdateUserNameForm;
