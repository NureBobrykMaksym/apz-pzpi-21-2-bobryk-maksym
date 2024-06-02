import {
  Button,
  Container,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Wrap,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { sectorsApi } from '../../api/sectors';
import { IUpdateSector } from '../../types/sectorTypes';
import { AttendanceTable } from '../Attendances/AttendanceTable';
import { AddSensorControls } from '../Sensors/AddSensorControls';
import { SensorsTable } from '../Sensors/SensorsTable';

export const SectorDetails = () => {
  const { t } = useTranslation();
  const { sectorId } = useParams();
  const tokenFromCookies: string | undefined = Cookies.get('token') || '';
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedSectorData, setUpdatedSectorData] = useState<IUpdateSector>({
    sector: { name: '', attendanceCoefficient: 0 },
  });

  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['sector', tokenFromCookies, sectorId],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      const response = await sectorsApi.getSectorById(
        +sectorId!,
        token as string
      );
      setUpdatedSectorData((prev) => ({
        sector: {
          ...prev.sector,
          name: response.name!,
          attendanceCoefficient: response.attendanceCoefficient!,
        },
      }));
      return response;
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: ({
      updatedSectorData,
      sectorId,
    }: {
      updatedSectorData: IUpdateSector;
      sectorId: number;
    }) => {
      return sectorsApi.updateSector(
        +sectorId,
        updatedSectorData,
        tokenFromCookies as string
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sector'] });
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
      setUpdatedSectorData({
        sector: {
          ...updatedSectorData.sector,
          [key]: e,
        },
      });
      return;
    }

    setUpdatedSectorData({
      sector: {
        ...updatedSectorData.sector,
        [key]: e.target.value,
      },
    });
  };

  const onUpdateSector = () => {
    mutation.mutate({ updatedSectorData, sectorId: +sectorId! });
    setIsEditMode(false);
  };

  return (
    <Container
      display={'flex'}
      flexDirection={'column'}
      maxW={'100%'}
      gap="16px"
    >
      <Wrap display="flex" gap="100px">
        {isSuccess && !isEditMode && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
              maxWidth: '400px',
            }}
          >
            <Heading as="p" size="lg">
              {data.name}
            </Heading>
            <p>{`${t('attendanceCoefficient')}${
              data.attendanceCoefficient
            }`}</p>
          </div>
        )}
        {isSuccess && isEditMode && (
          <form style={{ maxWidth: '400px' }}>
            <Input
              placeholder={t('sectorNamePlaceholder')}
              value={updatedSectorData.sector.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, 'name')
              }
              marginBottom={'8px'}
            />
            <NumberInput
              defaultValue={updatedSectorData.sector.attendanceCoefficient ?? 0}
              min={0}
              max={9999}
              value={updatedSectorData.sector.attendanceCoefficient ?? 0}
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
            <Button colorScheme="purple" onClick={onUpdateSector}>
              {t('updateSector')}
            </Button>
          </form>
        )}
        <Button colorScheme="green" w="fit-content" onClick={onChangeEditMode}>
          {t('editSector')}
        </Button>
      </Wrap>
      {isSuccess && (
        <>
          <AddSensorControls sectorId={data.id} />
          <SensorsTable sectorId={data?.id} sectorName={data?.name} />
        </>
      )}
      {data?.attendances?.length ? (
        <AttendanceTable attendances={data.attendances} />
      ) : (
        <p>{t('sectorNotHaveAttendances')}</p>
      )}
    </Container>
  );
};
