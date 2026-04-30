import { formatTime } from '@/lib/helper';
import { StoreHourProps } from '@/lib/types';
import clsx from 'clsx';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const StoreHour = ({
  dayOfWeek,
  openTime,
  closeTime,
  isClosed,
}: StoreHourProps) => {
  return (
    <div className={clsx('flex justify-between items-center')}>
      <p>{days[dayOfWeek]}</p>
      {openTime && closeTime ? (
        <p>
          {formatTime(openTime)} - {formatTime(closeTime)}
        </p>
      ) : null}

      {isClosed && <p>Currently Closed</p>}
    </div>
  );
};

export default StoreHour;
