import 'dotenv/config';
import db from '.';
import { StoreTable } from './schema/stores.schema';
import { StoreHourTable } from './schema/storeHours.schema';

export async function seed() {
  try {
    console.log('Seeding....');
    await db.delete(StoreTable);

    const store = {
      name: 'New York',
      street: '515 3rd Ave',
      city: 'New York',
      state: 'New York',
      zip: '10016',
      phone: '212-532-3300',
      country: 'United States',
      latitude: '40.746031',
      longitude: '-73.977631',
    };

    const [insertStore] = await db
      .insert(StoreTable)
      .values({
        name: store.name,
        street: store.street,
        city: store.city,
        state: store.state,
        zip: store.zip,
        phone: store.phone,
        country: store.country,
        latitude: store.latitude,
        longitude: store.longitude,
      })
      .returning();

    console.log('inserting hours');

    const [insertHours] = await db
      .insert(StoreHourTable)
      .values({
        storeId: insertStore.id,
        dayOfWeek: 0,
        openTime: '09:00',
        closeTime: '20:00',
        isClosed: false,
      })
      .returning();

    console.log('finish inserting');
    console.log(insertHours);
    console.log(insertStore);
  } catch (error) {
    console.error(error);
  }
}

seed();
