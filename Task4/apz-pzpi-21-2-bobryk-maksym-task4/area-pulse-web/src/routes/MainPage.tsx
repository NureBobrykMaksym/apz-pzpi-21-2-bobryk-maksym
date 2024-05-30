import { Box, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      <Heading as="h1" size="lg" marginBottom="20px">
        Main Page
      </Heading>
      <Stack direction={['column', 'row']} flexWrap="wrap" spacing="24px">
        <Link to="/locations">
          <Box
            w="300px"
            h="300px"
            border="1px solid #747d8c"
            p="20px"
            borderRadius="20px"
            transition="all 200ms ease-in-out"
            boxShadow="md"
            sx={{
              '&:hover': {
                boxShadow: 'xl',
              },
            }}
          >
            <Heading as="h2" size="md" marginBottom="20px">
              Locations
            </Heading>
            <p>See all locations</p>
          </Box>
        </Link>

        <Link to="/attendances">
          <Box
            w="300px"
            h="300px"
            border="1px solid #747d8c"
            p="20px"
            borderRadius="20px"
            boxShadow="md"
            transition="all 200ms ease-in-out"
            sx={{
              '&:hover': {
                boxShadow: 'xl',
              },
            }}
          >
            <Heading as="h2" size="md" marginBottom="20px">
              Attendances
            </Heading>
            <p>See all attendances</p>
          </Box>
        </Link>
      </Stack>
    </div>
  );
};
