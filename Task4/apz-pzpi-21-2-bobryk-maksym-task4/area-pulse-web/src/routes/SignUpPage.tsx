import { Center, Heading } from '@chakra-ui/react';
import { SignUpForm } from '../components/SignupForm/SignUpForm';

export const SignUpPage = () => {
  return (
    <Center
      h="fit-content"
      flexDirection="column"
      maxW={600}
      marginInline="auto"
    >
      <Heading as="h3" size="lg" marginBottom={16}>
        Sign Up
      </Heading>
      <SignUpForm />
    </Center>
  );
};
