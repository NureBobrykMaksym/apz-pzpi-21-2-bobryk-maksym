import { Box } from '@chakra-ui/react';

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
        <p>Header</p>
        <h1>Area Pulse</h1>
      </Box>
    </header>
  );
};
