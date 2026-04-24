import { BoundedProps } from '@/lib/types';
import clsx from 'clsx';

const Bounded = ({
  children,
  className,
  as: Comp = 'section',
  isPadded,
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'py-5 md:py-8 lg:py-12 space-y-8 md:space-y-10 lg:space-y-12 min-h-screen',
        isPadded && 'px-5 md:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
