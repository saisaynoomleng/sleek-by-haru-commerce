import { StoreCardProps } from '@/lib/types';
import clsx from 'clsx';
import Link from 'next/link';

const StoreCard = ({
  name,
  city,
  zip,
  street,
  country,
  id,
  phone,
  state,
  className,
}: StoreCardProps) => {
  return (
    <Link
      href={`/find-a-store/${id}`}
      className={clsx('border p-2 rounded-sm', className)}
    >
      <p className="font-semibold">{name}</p>
      <p>
        {street}, {city}
      </p>
      <p>
        {zip}, {state}
      </p>
      <p>{country}</p>
      <p>{phone}</p>
    </Link>
  );
};

export default StoreCard;
