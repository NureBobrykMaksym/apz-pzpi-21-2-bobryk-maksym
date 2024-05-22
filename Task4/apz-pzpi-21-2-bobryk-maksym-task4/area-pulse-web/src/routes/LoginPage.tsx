import { Center, Heading } from '@chakra-ui/react';
import { LoginForm } from '../components/LoginForm/LoginForm';

export const LogInPage = () => {
  return (
    <Center
      h="fit-content"
      flexDirection="column"
      maxW={600}
      marginInline="auto"
    >
      <Heading as="h3" size="lg" marginBottom={16}>
        Log In
      </Heading>
      <LoginForm />
    </Center>
  );
};
