'use client';

import { useActionState, useEffect } from 'react';
import SectionTitle from '../shared/SectionTitle';
import SubmitButton from '../shared/SubmitButton';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Form from 'next/form';
import { handleContactForm } from '@/actions/handleContactForm';
import { toast } from 'sonner';

const initialFormState = {
  success: false,
  message: '',
  field: '',
};

const ContactUsForm = () => {
  const [state, actionFunction] = useActionState(
    handleContactForm,
    initialFormState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    }

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <Form
      action={actionFunction}
      className="flex flex-col gap-y-5 md:gap-y-8 p-5"
    >
      <SectionTitle className="text-center">Get in Touch</SectionTitle>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <Input
            type="text"
            id="fullName"
            placeholder="Fullname"
            name="fullName"
            autoComplete="fullname"
          />
          {!state.success && state.field === 'fullName' && (
            <p className="form-error-message" aria-errormessage={state.message}>
              {state.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <Input
            type="text"
            id="phone"
            name="phone"
            placeholder="phone number"
            autoComplete="phone"
          />
          {!state.success && state.field === 'phone' && (
            <p className="form-error-message" aria-errormessage={state.message}>
              {state.message}
            </p>
          )}
        </div>

        <div className="space-y-1 col-span-full">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          {!state.success && state.field === 'email' && (
            <p className="form-error-message" aria-errormessage={state.message}>
              {state.message}
            </p>
          )}
        </div>

        <div className="space-y-1 col-span-full">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            placeholder="What is your interest?"
          />
          {!state.success && state.field === 'subject' && (
            <p className="form-error-message" aria-errormessage={state.message}>
              {state.message}
            </p>
          )}
        </div>

        <div className="space-y-1 col-span-full">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <Textarea id="message" name="message" placeholder="Tell us..." />
          {!state.success && state.field === 'message' && (
            <p className="form-error-message" aria-errormessage={state.message}>
              {state.message}
            </p>
          )}
        </div>

        <SubmitButton />
      </div>
    </Form>
  );
};

export default ContactUsForm;
