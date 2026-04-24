import { CTAProps } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import clsx from 'clsx';

const CTA = ({ className, href }: CTAProps) => {
  return (
    <Button asChild variant="cta" className={clsx(className)}>
      <Link href={href} aria-label="call to action">
        <GoArrowRight className="-rotate-45 group-hover:rotate-0 transition-all duration-200 ease-in-out group-hover:text-brand-white-50" />
      </Link>
    </Button>
  );
};

export default CTA;
