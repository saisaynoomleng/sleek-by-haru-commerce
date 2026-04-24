import { SectionTitleProps } from '@/lib/types';
import clsx from 'clsx';

const SectionTitle = ({
  className,
  children,
  as: Comp = 'h3',
}: SectionTitleProps) => {
  return (
    <Comp className={clsx('text-fs-500 font-semibold', className)}>
      {children}
    </Comp>
  );
};

export default SectionTitle;
