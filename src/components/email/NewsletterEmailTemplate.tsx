import {
  Html,
  Body,
  Container,
  Text,
  Tailwind,
  Img,
  Preview,
  Section,
  Head,
} from 'react-email';

export const NewsletterEmailTemplate = (email: string, preview: string) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-brand-white-100 text-brand-black-200 m-auto font-dm-sans">
          <Container className="space-y-3 max-w-116.25 mb-10 p-5">
            <Section>
              <Img
                src={`https://nf7ak2adgjtycvcs.public.blob.vercel-storage.com/logowithtext-Hvop4G3TlbskYDvgBYQzu265HJ59Mg.png`}
                width={60}
                height={60}
                alt="sleek by haru logo"
                className="mx-auto"
              />
            </Section>

            <Text>Thank you for your subscription!</Text>
            <Text>We will send you our seasonal updates and discounts!</Text>

            <Text>
              Cheers!
              <br /> Sleek by Haru Commerce
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
