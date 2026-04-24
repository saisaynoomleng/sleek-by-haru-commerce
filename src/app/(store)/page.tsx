import CTA from '@/components/shared/CTA';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut voluptatum,
        illo doloremque eum asperiores culpa at nisi vitae iusto iste!
      </p>
      <Button>Click</Button>
      <CTA href="/" />
      <SubmitButton />
    </main>
  );
}
