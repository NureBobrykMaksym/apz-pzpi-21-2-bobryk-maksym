import { Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import languages from '../../libs/languages';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Select
      defaultValue={i18n.resolvedLanguage}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
    >
      {languages.map((lang, i) => (
        <option style={{ color: 'black' }} key={i} value={lang.code}>
          {lang.code.toUpperCase()}
        </option>
      ))}
    </Select>
  );
}
