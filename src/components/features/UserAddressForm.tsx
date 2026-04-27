'use client';

import { handleUserAddressForm } from '@/actions/handleUserAddressForm';
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import SubmitButton from '../shared/SubmitButton';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const inititalFormState = {
  success: false,
  message: '',
  field: '',
};

const UserAddressForm = () => {
  const [state, actionFunction] = useActionState(
    handleUserAddressForm,
    inititalFormState,
  );
  const router = useRouter();

  const [check, setCheck] = useState<boolean>(false);
  const [addressType, setAddressType] = useState<
    'billing' | 'shipping' | 'both'
  >('billing');

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      router.push('/user/addresses');
    }

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state.message, state.success, router]);

  return (
    <Form action={actionFunction} className="flex flex-col gap-y-3">
      <div className="space-y-1">
        <label htmlFor="address1" className="form-label">
          Address 1
        </label>
        <Input
          type="text"
          name="address1"
          id="address1"
          placeholder="Street"
          autoComplete="address-line1"
        />
        {!state.success && state.field === 'address1' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="address2">Address 2</label>
        <Input
          type="text"
          name="address2"
          id="address2"
          placeholder="Apt, Suite"
          autoComplete="address-line2"
        />
        {!state.success && state.field === 'address2' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <Input
          type="text"
          name="city"
          id="city"
          placeholder="New York"
          autoComplete="address-level2"
        />
        {!state.success && state.field === 'city' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="zip" className="form-label">
          Zip/Postal
        </label>
        <Input
          type="text"
          name="zip"
          id="zip"
          placeholder="10000"
          autoComplete="postal-code"
        />
        {!state.success && state.field === 'zip' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <Input
          type="text"
          id="state"
          name="state"
          placeholder="New York"
          autoComplete="address-level1"
        />
        {!state.success && state.field === 'state' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <Input
          type="text"
          name="country"
          id="country"
          placeholder="United States"
          autoComplete="country"
        />
        {!state.success && state.field === 'country' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </div>

      <Select
        onValueChange={(value) =>
          setAddressType(value as 'billing' | 'shipping' | 'both')
        }
      >
        <SelectTrigger
          defaultValue="billing"
          aria-placeholder="select address type"
          className="w-full"
        >
          <SelectValue placeholder="Select Address Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Address Type</SelectLabel>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="shipping">Shipping</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectGroup>
        </SelectContent>
        {!state.success && state.field === 'type' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
      </Select>
      <input type="hidden" aria-hidden={true} name="type" value={addressType} />

      <div className="space-y-1">
        <label htmlFor="isDefault" className="flex items-center gap-x-1">
          <Checkbox
            id="isDefault"
            onCheckedChange={(value) => setCheck(!!value)}
            checked={check}
          />
          Set this as default address
        </label>
        {!state.success && state.field === 'isDefault' ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}
        <input
          type="hidden"
          aria-hidden={true}
          name="isDefault"
          value={String(check)}
        />
      </div>

      <SubmitButton className="self-start" />
    </Form>
  );
};

export default UserAddressForm;
