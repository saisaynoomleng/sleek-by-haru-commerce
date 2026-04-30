import Image from 'next/image';
import SectionTitle from './SectionTitle';

const logos = [
  {
    name: 'parker & co.',
    url: '/press-item-1.avif',
  },
  {
    name: 'the hayden',
    url: '/press-item-2.avif',
  },
  {
    name: 'good mood',
    url: '/press-item-3.avif',
  },
];

const FeaturedPressBanner = () => {
  return (
    <div className="grid md:grid-cols-3 place-items-center gap-y-5">
      <SectionTitle className="col-span-full text-center">
        Featured by Press
      </SectionTitle>

      {logos.map((l) => (
        <div className="overflow-hidden" key={l.name}>
          <Image
            src={l.url}
            width={100}
            height={100}
            alt={`${l.name}'s logo`}
            className="w-30"
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedPressBanner;
