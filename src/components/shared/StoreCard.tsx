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
  storeHour,
}: StoreCardProps) => {
  const days = {
    0: 'Sunday',
  };

  return (
    <Link href={`/find-a-store/${id}`} className={clsx('', className)}>
      <p className="font-semibold">{name}</p>
      <p>
        {street}, {city}
      </p>
      <p>
        {zip}, {state}
      </p>
      <p>{country}</p>
      <p>{phone}</p>

      <p>
        {storeHour.map((store, i) => (
          <span key={i}>{days[store.day]}</span>
        ))}
      </p>
    </Link>
  );
};

export default StoreCard;
