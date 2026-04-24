import UserAddressForm from '@/components/features/UserAddressForm';
import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';

const UserManageAddressesPage = () => {
  return (
    <Bounded>
      <SectionTitle>Manage Addresses</SectionTitle>

      <UserAddressForm />
    </Bounded>
  );
};

export default UserManageAddressesPage;
