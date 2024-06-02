import { Box, Button, Heading, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdLogout } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { usersApi } from '../../api/users';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitche';

export const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const showLogoutButton =
    !location.pathname.includes('/login') &&
    !location.pathname.includes('/sign-up');

  const onLogoutClick = () => {
    usersApi.logout();
    navigate('/login');
  };

  return (
    <header>
      <Box
        bg="blueviolet"
        w="100%"
        paddingBlock={'12px'}
        paddingInline={'24px'}
        color="white"
        display="flex"
        justifyContent="space-between"
      >
        <Heading as="h1">Area Pulse</Heading>

        <div style={{ display: 'flex', gap: '4px' }}>
          <LanguageSwitcher />
          {showLogoutButton && (
            <Tooltip label={t('logOut')}>
              <Button onClick={onLogoutClick} background="#fff" p="12px">
                <MdLogout style={{ width: '24px', height: '24px' }} />
              </Button>
            </Tooltip>
          )}
        </div>
      </Box>
    </header>
  );
};
