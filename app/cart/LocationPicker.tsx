'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Loader2 } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultCenter = {
  lat: -6.2088,
  lng: 106.8456 // Jakarta default
};

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
    province: string;
    city: string;
    postalCode: string;
    country: string;
  }) => void;
}

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ location: { lat, lng } });

      if (result.results[0]) {
        const addressComponents = result.results[0].address_components;
        let province = '';
        let city = '';
        let postalCode = '';
        let country = 'Indonesia';

        addressComponents.forEach((component) => {
          if (component.types.includes('administrative_area_level_1')) {
            province = component.long_name;
          }
          if (component.types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
          if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        onLocationSelect({
          lat,
          lng,
          address: result.results[0].formatted_address,
          province,
          city,
          postalCode,
          country
        });

        return result.results[0].formatted_address;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setLocationError('Gagal mendapatkan alamat dari lokasi ini');
    }
    return '';
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newPos = { lat, lng };
          setMarkerPosition(newPos);
          if (map) {
            map.panTo(newPos);
            map.setZoom(15);
          }
          reverseGeocode(lat, lng);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Browser kamu tidak mendukung geolocation');
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (isLoaded && !loadError) {
      // Auto-request location on mount
      getCurrentLocation();
    }
  }, [isLoaded, loadError]);

  if (loadError) {
    return (
      <div className="p-4 bg-red-950/40 border border-red-500 text-red-400 text-xs tracking-wider rounded-none">
        Error loading maps. Check API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-bg-panel border border-stone-gray">
        <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[10px] font-bold text-text-secondary tracking-wider">
          Pilih Lokasi di Peta
        </label>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLoadingLocation}
          className="text-xs tracking-wider font-bold text-brand-green hover:text-brand-green/80 flex items-center gap-2 border-0 bg-transparent cursor-pointer disabled:opacity-50"
        >
          {isLoadingLocation ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Mendapatkan lokasi...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              Gunakan Lokasi Saya
            </>
          )}
        </button>
      </div>

      {locationError && (
        <div className="p-2 bg-red-950/40 border border-red-500 text-red-400 text-xs tracking-wider rounded-none">
          {locationError}
        </div>
      )}

      <div className="border-2 border-stone-gray rounded-none overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>

      <p className="text-[10px] text-text-secondary tracking-wider">
        💡 Klik pada peta untuk memilih lokasi, atau gunakan tombol "Gunakan Lokasi Saya" untuk auto-fill berdasarkan GPS kamu.
      </p>
    </div>
  );
}
