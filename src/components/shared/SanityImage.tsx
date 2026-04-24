import { SanityImageProps } from '@/lib/types';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';

const SanityImage = ({
  className,
  alt,
  imageUrl,
  width,
  height,
}: SanityImageProps) => {
  return (
    <Image
      alt={alt}
      src={urlFor(imageUrl).format('webp').url()}
      width={width}
      height={height}
      loading="lazy"
      className={clsx('object-cover min-w-full', className)}
    />
  );
};

export default SanityImage;
