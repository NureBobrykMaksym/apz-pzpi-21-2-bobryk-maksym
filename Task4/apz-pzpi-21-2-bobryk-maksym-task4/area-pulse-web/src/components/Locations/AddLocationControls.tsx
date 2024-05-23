import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { locationsApi } from '../../api/locations';
import { ICreateLocation } from '../../types/locationTypes';

export const AddLocationControls = () => {
  const tokenFromCookies: string | undefined = Cookies.get('token');
  const [newLocationData, setNewLocationData] = useState<ICreateLocation>({
    location: { name: '', description: '', area: null },
  });

  const mutation = useMutation({
    mutationFn: (createLocationData: ICreateLocation) => {
      return locationsApi.createLocation(createLocationData, tokenFromCookies);
    },
  });

  const onCreateLocation = () => {
    mutation.mutate(newLocationData);
  }

  return (
    <div>
      <input type="text" placeholder="Location name..." />
      <input type="text" placeholder="Description..." />
      <input type="text" placeholder="Area..." />

      <Button onClick={onCreateLocation}>
        Add a location
      </Button>
    </div>
  );
};
