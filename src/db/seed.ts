import 'dotenv/config';
import db from '.';
import { StoreTable } from './schema/stores.schema';
import { StoreHourTable } from './schema/storeHours.schema';

export async function seed() {
  try {
    console.log('Seeding....');
    await db.delete(StoreTable);
    await db.delete(StoreHourTable);

    const locations = [
      {
        name: 'Sleek Los Angeles',
        street: '830 E Washington Blvd',
        city: 'Los Angeles',
        state: 'California',
        zip: '90021',
        phone: '(213) 765-9954',
        country: 'United States',
        latitude: 34.025733,
        longitude: -118.253553,
      },
      {
        name: 'Sleek New York City',
        street: '515 3rd Ave',
        city: 'New York',
        state: 'New York',
        zip: '10016',
        phone: '(212) 532-3300',
        country: 'United States',
        latitude: 40.746031,
        longitude: -73.977631,
      },
      {
        name: 'Sleek San Francisco',
        street: '865 Market St',
        city: 'San Francisco',
        state: 'California',
        zip: '94103',
        phone: '(415) 357-3640',
        country: 'United States',
        latitude: 37.7843,
        longitude: -122.406,
      },
      {
        name: 'Sleek Baltimore',
        street: '6902 Eastern Ave',
        city: 'Baltimore',
        state: 'Maryland',
        zip: '21224',
        phone: '(410) 282-4211',
        country: 'United States',
        latitude: 39.288347,
        longitude: -76.529626,
      },
      {
        name: 'Sleek Columbia',
        street: '1014 E Broadway',
        city: 'Columbia',
        state: 'Missouri',
        zip: '65201',
        phone: '(573) 875-2121',
        country: 'United States',
        latitude: 38.95137,
        longitude: -92.325929,
      },
    ];

    const buildHours = (storeId: string) => {
      return [
        // Sunday
        {
          storeId,
          dayOfWeek: 0,
          openTime: '09:00',
          closeTime: '22:00',
          isClosed: false,
        },

        // Monday - Friday
        ...[1, 2, 3, 4, 5].map((day) => ({
          storeId,
          dayOfWeek: day,
          openTime: '10:00',
          closeTime: '20:00',
          isClosed: false,
        })),

        // Saturday
        {
          storeId,
          dayOfWeek: 6,
          openTime: '09:00',
          closeTime: '22:00',
          isClosed: false,
        },
      ];
    };

    for (const s of locations) {
      const [store] = await db
        .insert(StoreTable)
        .values({
          name: s.name,
          street: s.street,
          city: s.city,
          zip: s.zip,
          phone: s.phone,
          country: s.country,
          latitude: s.latitude,
          longitude: s.longitude,
          state: s.state,
        })
        .returning({ id: StoreTable.id });

      await db.insert(StoreHourTable).values(buildHours(store.id));
    }

    console.log('finish inserting');
  } catch (error) {
    console.error(error);
  }
}

seed();
