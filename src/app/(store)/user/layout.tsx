import UserNav from '@/components/shared/UserNav';

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="grid grid-cols-[auto_1fr] gap-x-3">
      <UserNav />
      {children}
    </main>
  );
};

export default UserLayout;
