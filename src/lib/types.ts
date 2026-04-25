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
  children?: React.ReactNode;
  variant?: 'arrow' | 'text';
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

// Store Card
export type StoreCardProps = {
  name: string;
  city: string;
  zip: string;
  country: string;
  street: string;
  phone: string;
  state: string;
  className?: string;
  id: string;
  storeHour: { day: string; open_time: string; close_time: string }[];
};

// Prev Form States Props
export type PrevFormStateProps = {
  success: boolean;
  message: string;
  field?: string;
};

// Navlink button
export type NavLinkButtonProps = {
  className?: string;
  pathname: string;
  href: string;
  linkName: React.ReactNode;
};
