import { UserAddress } from '@/lib/validations';

const AddressCard = ({
  address1,
  address2,
  city,
  state,
  zip,
  country,
  type,
  isDefault,
}: UserAddress) => {
  return (
    <div className="border border-brand-teal-600 p-3 rounded-2xl flex flex-col gap-y-1">
      <div className="flex justify-between items-center">
        <p className="font-medium">Address 1</p>
        <p>{address1}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">Address 2</p>
        <p>{address2}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">City</p>
        <p>{city}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">Zip/Postal</p>
        <p>{zip}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">State</p>
        <p>{state}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">Country</p>
        <p>{country}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-medium">Type</p>
        <p>{type === 'both' ? 'Billing, Shipping' : type}</p>
      </div>

      {isDefault && (
        <div className="self-end px-2 py-1 bg-brand-teal-700 rounded-2xl text-fs-300 text-brand-white-100">
          <p>Default</p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
