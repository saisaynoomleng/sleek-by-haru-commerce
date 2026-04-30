import Bounded from '@/components/shared/Bounded';
import Mapbox from '@/components/shared/Mapbox';
import SectionTitle from '@/components/shared/SectionTitle';
import StoreHour from '@/components/shared/StoreHour';
import db from '@/db';
import { StoreTable } from '@/db/schema/stores.schema';
import { eq } from 'drizzle-orm';

const StoreDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const store = await db.query.StoreTable.findFirst({
    where: eq(StoreTable.id, id),
    with: {
      storeHours: true,
    },
  });

  return (
    store && (
      <Bounded isPadded className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-y-1">
          <SectionTitle>{store.name}</SectionTitle>

          <div className="flex justify-between items-center">
            <p>Street </p>
            <p>{store.street}</p>
          </div>

          <div className="flex justify-between items-center">
            <p>City </p>
            <p>{store.city}</p>
          </div>

          <div className="flex justify-between items-center">
            <p>State </p>
            <p>{store.state}</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Zip/Postal </p>
            <p>{store.zip}</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Phone </p>
            <p>{store.phone}</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Country </p>
            <p>{store.country}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <SectionTitle as="h5">Store Hours</SectionTitle>
          {store.storeHours.map((hour) => (
            <StoreHour key={hour.id} {...hour} />
          ))}
        </div>

        <Mapbox
          className="col-span-full"
          latitude={store.latitude}
          longitude={store.longitude}
        />
      </Bounded>
    )
  );
};

export default StoreDetail;
