import ContactUsForm from '@/components/features/ContactUsForm';
import Bounded from '@/components/shared/Bounded';
import FeaturedPressBanner from '@/components/shared/FeaturedPressBanner';
import { sanityFetch } from '@/sanity/lib/live';
import { MAIN_PAGE_QUERY } from '@/sanity/lib/query';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'contact-us';
  const { data } = await sanityFetch({
    query: MAIN_PAGE_QUERY,
    params: { slug },
  });

  if (!data) {
    return {
      title: 'Sleek',
      description:
        'Discover Sleek: A science-backed skincare destination offering premium, dermatologist-vetted formulas. Shop our collection online or visit one of our physical store locations across the U.S. for personalized skincare expertise.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle as string,
      description: data.metaDescription as string,
      images: [{ url: data.opengraphImage as string }],
    },
  };
}

const ContactUsPage = async () => {
  return (
    <Bounded isPadded>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-x-5 bg-brand-orange-100 rounded-2xl">
        <div className="overflow-hidden hidden md:block">
          <Image
            src="/contact-us.jpg"
            alt=""
            width={600}
            height={800}
            className="rounded-2xl md:rounded-tr-none md:rounded-br-none min-w-full mx-auto"
          />
        </div>

        <ContactUsForm />
      </div>
      <FeaturedPressBanner />
    </Bounded>
  );
};

export default ContactUsPage;
