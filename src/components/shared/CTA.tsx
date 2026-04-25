import { CTAProps } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';
import clsx from 'clsx';

const CTA = ({ className, href, variant = 'text', children }: CTAProps) => {
  return (
    <Button asChild variant="cta">
      <Link
        href={href}
        aria-label="call to action"
        className={clsx(
          variant === 'arrow'
            ? 'bg-brand-black-100/20 rounded-full group hover:bg-brand-black-100 w-8 aspect-square'
            : 'bg-transparent block! text-brand-black-200! rounded-none underline hover:text-brand-red-300!',
          className,
        )}
      >
        {variant === 'arrow' ? (
          <GoArrowRight className="-rotate-45 group-hover:rotate-0 transition-all duration-200 ease-in-out group-hover:text-brand-white-50" />
        ) : (
          <span>{children}</span>
        )}
      </Link>
    </Button>
  );
};

export default CTA;
