// Bounded
export type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  isPadded?: boolean;
};

// CTA props
export type CTAProps = {
  className?: string;
  href: string;
};

// Section Title
export type SectionTitleProps = {
  className?: string;
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'h5';
};

// SanityImage
export type SanityImageProps = {
  width: number;
  height: number;
  imageUrl: string;
  alt: string;
  className?: string;
};

// Submit Button
export type SubmitButton = {
  className?: string;
};
