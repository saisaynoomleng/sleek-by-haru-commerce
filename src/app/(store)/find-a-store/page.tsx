import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import StoreCard from '@/components/shared/StoreCard';
import db from '@/db';
import { Suspense } from 'react';

const FindAStorePage = async () => {
  const stores = await db.query.StoreTable.findMany({
    with: {
      storeHours: true,
    },
  });

  return (
    <Bounded isPadded>
      <SectionTitle className="text-center">Our Stores</SectionTitle>

      <div className="grid gap-y-3">
        {stores.map((store) => (
          <Suspense key={store.id} fallback={<div>Loading...</div>}>
            <StoreCard {...store} />
          </Suspense>
        ))}
      </div>
    </Bounded>
  );
};

export default FindAStorePage;
