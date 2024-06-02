import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { sensorsApi } from '../../api/sensors';
import { IUpdateSensor } from '../../types/sensorTypes';

export const SensorDetails = () => {
  const { t } = useTranslation();
  const { sensorId } = useParams();
  const tokenFromCookies: string | undefined = Cookies.get('token') || '';
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedSensorData, setUpdatedSensorData] = useState<IUpdateSensor>({
    sensor: { name: '' },
  });

  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['sensor', tokenFromCookies, sensorId],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      const response = await sensorsApi.getSensorById(
        token as string,
        +sensorId!
      );
      setUpdatedSensorData((prev) => ({
        sensor: {
          ...prev.sensor,
          name: response.name!,
        },
      }));
      return response;
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: ({
      updatedSensorData,
      sensorId,
    }: {
      updatedSensorData: IUpdateSensor;
      sensorId: number;
    }) => {
      return sensorsApi.updateSensor(
        tokenFromCookies as string,
        +sensorId,
        updatedSensorData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensor'] });
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
      setUpdatedSensorData({
        sensor: {
          ...updatedSensorData.sensor,
          [key]: e,
        },
      });
      return;
    }

    setUpdatedSensorData({
      sensor: {
        ...updatedSensorData.sensor,
        [key]: e.target.value,
      },
    });
  };

  const onUpdateSensor = () => {
    mutation.mutate({ updatedSensorData, sensorId: +sensorId! });
    setIsEditMode(false);
  };

  return (
    <Container display={'flex'} maxW={'100%'} gap="100px">
      {isSuccess && !isEditMode && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Heading as="p" size="lg" mb="16px">
            {`${t('sensorNameHeading')}${data.name}`}
          </Heading>
          <Heading as="p" size="md" fontWeight="400">
            {`${t('sensorsSector')} ${data.sector.name}`}
          </Heading>
        </div>
      )}
      {isSuccess && isEditMode && (
        <form>
          <Input
            placeholder={t('sensorName')}
            value={updatedSensorData.sensor.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 'name')
            }
            marginBottom={'8px'}
          />
          <Button colorScheme="purple" onClick={onUpdateSensor}>
            {t('updateSensor')}
          </Button>
        </form>
      )}
      <Button colorScheme="green" w="fit-content" onClick={onChangeEditMode}>
        {t('editSensor')}
      </Button>
    </Container>
  );
};
