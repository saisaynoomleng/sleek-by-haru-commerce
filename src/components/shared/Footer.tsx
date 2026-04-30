import Image from 'next/image';
import NewsletterForm from '../features/NewsletterForm';

const Footer = () => {
  return (
    <footer className="grid md:grid-cols-3 gap-5 p-5 md:py-10 bg-brand-teal-100">
      <div className="space-y-2">
        <Image src="/logowithtext.png" alt="logo" width={150} height={150} />
        <p>
          We only carry designs we believe in ethically and asthetically —
          original, authentic pieces that are made to last.
        </p>
      </div>

      <NewsletterForm className="md:col-start-2 md:col-end-4" />

      <div className="col-span-full flex flex-col md:flex-row md:justify-between text-brand-black-100/50">
        <p>Developed by sai say noom leng.</p>
        <p>copyright&copy;sleek by haru commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
