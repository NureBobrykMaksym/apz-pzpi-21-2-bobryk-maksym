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
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sectorsApi } from '../../api/sectors';
import { IUpdateSector } from '../../types/sectorTypes';
import { AttendanceTable } from '../Attendances/AttendanceTable';

export const SectorDetails = () => {
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
      {isSuccess && !isEditMode && (
        <>
          <Heading as="p" size="lg">
            {data.name}
          </Heading>
          <p>{data.attendanceCoefficient}</p>
        </>
      )}
      {isSuccess && isEditMode && (
        <form>
          <Input
            placeholder="Sector name..."
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
          <Button onClick={onUpdateSector}>Update sector</Button>
        </form>
      )}
      <Button w="fit-content" onClick={onChangeEditMode}>
        Edit sector
      </Button>
      {data?.attendances?.length ? (
        <AttendanceTable attendances={data.attendances} />
      ) : (
        <p>This section does not have attendances yet</p>
      )}
    </Container>
  );
};
