import MainNav from '@/components/shared/MainNav';

const StoreLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <MainNav />
      {children}
    </main>
  );
};

export default StoreLayout;
