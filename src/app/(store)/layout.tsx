import Footer from '@/components/shared/Footer';
import MainNav from '@/components/shared/MainNav';

const StoreLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <MainNav />
      {children}
      <Footer />
    </main>
  );
};

export default StoreLayout;
