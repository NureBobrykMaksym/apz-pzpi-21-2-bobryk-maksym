import { Button, Container, Heading, Input } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sensorsApi } from '../../api/sensors';
import { IUpdateSensor } from '../../types/sensorTypes';

export const SensorDetails = () => {
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
    <Container
      display={'flex'}
      flexDirection={'column'}
      maxW={'100%'}
      gap="16px"
    >
      {isSuccess && !isEditMode && (
        <>
          <Heading as="p" size="lg">
            {data.name}
          </Heading>
        </>
      )}
      {isSuccess && isEditMode && (
        <form>
          <Input
            placeholder="Sensor name..."
            value={updatedSensorData.sensor.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 'name')
            }
            marginBottom={'8px'}
          />
          <Button onClick={onUpdateSensor}>Update sensor</Button>
        </form>
      )}
      <Button w="fit-content" onClick={onChangeEditMode}>
        Edit sensor
      </Button>
    </Container>
  );
};
