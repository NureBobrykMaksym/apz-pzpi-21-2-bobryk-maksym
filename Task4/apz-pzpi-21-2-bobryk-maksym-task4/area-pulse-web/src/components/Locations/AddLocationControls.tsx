import {
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Wrap,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { locationsApi } from '../../api/locations';
import { ICreateLocation } from '../../types/locationTypes';

export const AddLocationControls = () => {
  const tokenFromCookies: string | undefined = Cookies.get('token');
  const [newLocationData, setNewLocationData] = useState<ICreateLocation>({
    location: { name: '', description: '', area: null },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (createLocationData: ICreateLocation) => {
      return locationsApi.createLocation(
        createLocationData,
        tokenFromCookies as string
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | number,
    key: string
  ) => {
    if (typeof e === 'number') {
      setNewLocationData({
        location: {
          ...newLocationData.location,
          [key]: e,
        },
      });
      return;
    }

    setNewLocationData({
      location: {
        ...newLocationData.location,
        [key]: e.target.value,
      },
    });
  };

  const onCreateLocation = () => {
    mutation.mutate(newLocationData);
    setNewLocationData({
      location: { name: '', description: '', area: null },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onCreateLocation)}
      style={{ marginBottom: '24px' }}
    >
      <Wrap h="fit-content" flexDirection="column" maxW={600} gap={'8px'}>
        <Input
          placeholder="Location name..."
          value={newLocationData.location.name}
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'name')
          }
        />
        <Input
          placeholder="Description..."
          value={newLocationData.location.description}
          {...register('description', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'description')
          }
        />
        <NumberInput
          defaultValue={newLocationData.location.area ?? 0}
          min={0}
          max={9999}
          value={newLocationData.location.area ?? 0}
          onChange={(_, value: number) => {
            handleInputChange(value, 'area');
          }}
          width={'100%'}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button type="submit">Add a location</Button>

        {errors.name && (
          <Heading color="red" as="h4" size="sm">
            {errors?.name?.message as string}
          </Heading>
        )}
        {errors.description && (
          <Heading color="red" as="h4" size="sm">
            {errors?.description?.message as string}
          </Heading>
        )}
      </Wrap>
    </form>
  );
};