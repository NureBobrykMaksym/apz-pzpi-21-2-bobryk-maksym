import { Button, Container, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { locationsApi } from '../../api/locations';
import { IUpdateLocation } from '../../types/locationTypes';
import { SectorsTable } from '../Sectors/SectorsTable';

export const LocationDetails = () => {
  const { locationId } = useParams();
  const tokenFromCookies: string | undefined = Cookies.get('token') || '';
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedLocationData, setUpdatedLocationData] =
    useState<IUpdateLocation>({
      location: { name: '', description: '', area: 0 },
    });

  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['location', tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      const response = await locationsApi.getLocationById(+locationId!, token);
      setUpdatedLocationData((prev) => ({
        location: { ...prev, ...response },
      }));
      return response;
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: ({
      updatedLocationData,
      locationId,
    }: {
      updatedLocationData: IUpdateLocation;
      locationId: number;
    }) => {
      return locationsApi.updateLocation(
        +locationId,
        updatedLocationData,
        tokenFromCookies as string
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
  });

  const onChangeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | number,
    key: string
  ) => {
    if (typeof e === 'number') {
      setUpdatedLocationData({
        location: {
          ...updatedLocationData.location,
          [key]: e,
        },
      });
      return;
    }

    setUpdatedLocationData({
      location: {
        ...updatedLocationData.location,
        [key]: e.target.value,
      },
    });
  };

  const onUpdateLocation = () => {
    mutation.mutate({updatedLocationData, locationId: +locationId!});
    setIsEditMode(false);
  };

  return (
    <Container display={'flex'} flexDirection={'column'} maxW={'100%'} gap='16px'>
      {isSuccess && !isEditMode && (
        <>
          <Heading as="p" size="lg">
            {data.name}
          </Heading>
          <p>{data.description}</p>
          <p>{data.area}</p>
        </>
      )}
      {isSuccess && isEditMode && (
        <form>
          <Input
            placeholder="Location name..."
            value={updatedLocationData.location.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 'name')
            }
            marginBottom={'8px'}
            />
          <Input
            placeholder="Description..."
            value={updatedLocationData.location.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 'description')
            }
            marginBottom={'8px'}
            />
          <NumberInput
            defaultValue={updatedLocationData.location.area ?? 0}
            min={0}
            max={9999}
            value={updatedLocationData.location.area ?? 0}
            onChange={(_, value: number) => {
              handleInputChange(value, 'area');
            }}
            width={'100%'}
            marginBottom={'8px'}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={onUpdateLocation}>Update location</Button>
        </form>
      )}
      <Button w="fit-content" onClick={onChangeEditMode}>Edit location</Button>

      {data && <SectorsTable location={data} />}
    </Container>
  );
};
