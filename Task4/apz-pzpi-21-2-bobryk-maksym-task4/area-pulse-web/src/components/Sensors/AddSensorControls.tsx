import { Button, Heading, Input, Wrap } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { sensorsApi } from '../../api/sensors';
import { ICreateSensor } from '../../types/sensorTypes';

type AddSensorControlsProps = {
  sectorId: number;
};

export const AddSensorControls: FC<AddSensorControlsProps> = ({ sectorId }) => {
  const { t } = useTranslation();
  const tokenFromCookies: string | undefined = Cookies.get('token');
  const [newSensorData, setNewSensorData] = useState<ICreateSensor>({
    sensor: { name: '', sectorId },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (createSensorData: ICreateSensor) => {
      return sensorsApi.createSensor(
        tokenFromCookies as string,
        createSensorData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensors'] });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setNewSensorData({
      sensor: {
        ...newSensorData.sensor,
        [key]: e.target.value,
      },
    });
  };

  const onCreateLocation = () => {
    mutation.mutate(newSensorData);
    console.log(newSensorData);
    setNewSensorData({
      sensor: { name: '', sectorId },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onCreateLocation)}
      style={{ marginTop: '24px' }}
    >
      <Wrap h="fit-content" flexDirection="column" maxW={600} gap={'8px'}>
        <Input
          placeholder={t('sensorName')}
          value={newSensorData.sensor.name}
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'name')
          }
        />

        <Button colorScheme="purple" type="submit">
          {t('addSensor')}
        </Button>

        {errors.name && (
          <Heading color="red" as="h4" size="sm">
            {errors?.name?.message as string}
          </Heading>
        )}
      </Wrap>
    </form>
  );
};
