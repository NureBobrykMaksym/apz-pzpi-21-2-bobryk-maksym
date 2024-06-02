import { Center, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/LoginForm/LoginForm';

export const LogInPage = () => {
  const { t } = useTranslation('');

  return (
    <Center
      h="fit-content"
      flexDirection="column"
      maxW={600}
      marginInline="auto"
    >
      <Heading as="h3" size="lg" marginBottom={16}>
        {t('login')}
      </Heading>
      <LoginForm />
    </Center>
  );
};
