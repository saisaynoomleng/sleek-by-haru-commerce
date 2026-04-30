import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';

export const ContactUsEmailTemplate = (
  fullName: string,
  previewText: string,
) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-brand-white-100 m-auto font-dm-sans">
          <Container className="space-y-3 mx-auto mb-10 p-5 max-w-116.25">
            <Section>
              <Img
                src={`https://nf7ak2adgjtycvcs.public.blob.vercel-storage.com/logowithtext-Hvop4G3TlbskYDvgBYQzu265HJ59Mg.png`}
                width={60}
                height={60}
                alt="sleek by haru logo"
                className="mx-auto"
              />
            </Section>
            <Heading className="text-2xl font-medium">
              Welcome to <strong>Sleek by Haru Commerce</strong>
            </Heading>
            <Text className="text-start text-sm">Hello {fullName},</Text>
            <Text className="text-start text-sm">
              We have received your email! Our team will be with you shortly!
            </Text>
            <Text>
              Cheers,
              <br /> Sleek by Haru Commerce
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
