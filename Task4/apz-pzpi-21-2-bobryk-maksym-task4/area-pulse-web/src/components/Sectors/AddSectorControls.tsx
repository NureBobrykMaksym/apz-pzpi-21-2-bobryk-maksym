import {
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Wrap,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sectorsApi } from '../../api/sectors';
import { ILocation } from '../../types/locationTypes';
import { ICreateSector } from '../../types/sectorTypes';
import { useTranslation } from 'react-i18next';

type AddSectorControlsProps = {
  locations: ILocation[];
};

export const AddSectorControls: FC<AddSectorControlsProps> = ({
  locations,
}) => {
  const { t } = useTranslation();
  const tokenFromCookies: string | undefined = Cookies.get('token');
  const [newSectorData, setNewSectorData] = useState<ICreateSector>({
    sector: { name: '', locationId: 0, attendanceCoefficient: 0 },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (createSectorData: ICreateSector) => {
      return sectorsApi.createSector(
        createSectorData,
        tokenFromCookies as string
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
    },
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | number,
    key: string
  ) => {
    if (typeof e === 'number') {
      setNewSectorData({
        sector: {
          ...newSectorData.sector,
          [key]: e,
        },
      });
      return;
    }

    setNewSectorData({
      sector: {
        ...newSectorData.sector,
        [key]: e.target.value,
      },
    });
  };

  const onCreateLocation = () => {
    mutation.mutate(newSectorData);
    setNewSectorData({
      sector: { name: '', locationId: 0, attendanceCoefficient: 0 },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onCreateLocation)}
      style={{ marginBottom: '24px', display: 'flex', gap: '100px' }}
    >
      <Wrap h="fit-content" flexDirection="column" maxW={400} gap={'8px'}>
        <Input
          placeholder={t('sectorNamePlaceholder')}
          value={newSectorData.sector.name}
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'name')
          }
        />

        <Select
          placeholder={t('chooseLocation')}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setNewSectorData({
              sector: {
                ...newSectorData.sector,
                locationId: +e.target.value,
              },
            });
          }}
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>

        <NumberInput
          defaultValue={newSectorData.sector.attendanceCoefficient ?? 0}
          min={0}
          max={9999}
          value={newSectorData.sector.attendanceCoefficient ?? 0}
          onChange={(_, value: number) => {
            handleInputChange(value, 'attendanceCoefficient');
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

        {errors.name && (
          <Heading color="red" as="h4" size="sm">
            {errors?.name?.message as string}
          </Heading>
        )}
      </Wrap>
      <Button colorScheme="purple" type="submit">
        {t('addSector')}
      </Button>
    </form>
  );
};
