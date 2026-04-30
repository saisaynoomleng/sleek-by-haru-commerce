'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

import { env } from '@/lib/env/client';
import clsx from 'clsx';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox({
  className,
  latitude,
  longitude,
}: {
  className?: string;
  latitude: number;
  longitude: number;
}) {
  return (
    <div className={clsx('overflow-hidden', className)}>
      <Map
        initialViewState={{
          latitude,
          longitude,
          zoom: 16,
        }}
        style={{ width: 500, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
      >
        <Marker longitude={longitude} latitude={latitude} color="red" />
      </Map>
    </div>
  );
}
