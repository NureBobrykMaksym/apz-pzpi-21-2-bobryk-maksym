import { Box, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <header>
      <Box
        bg="blueviolet"
        w="100%"
        paddingBlock={'12px'}
        paddingInline={'24px'}
        color="white"
        display="flex"
      >
        <Heading as="h1">Area Pulse</Heading>
      </Box>
    </header>
  );
};
