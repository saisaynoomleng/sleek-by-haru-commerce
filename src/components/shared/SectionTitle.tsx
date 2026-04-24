import { SectionTitleProps } from '@/lib/types';
import clsx from 'clsx';

const SectionTitle = ({
  className,
  children,
  as: Comp = 'h3',
}: SectionTitleProps) => {
  return (
    <Comp className={clsx('text-fs-500 md:text-fs-600 font-medium', className)}>
      {children}
    </Comp>
  );
};

export default SectionTitle;
