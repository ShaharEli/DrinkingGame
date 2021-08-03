import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import {ScreenWrapper} from '../../styles/styleComponents';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppSelector} from '../../hooks';
import {font} from '../../styles/themes/general';
import MainBtn from '../../components/MainBtn';
import {Lang, Maybe} from '../../types';
import {useTranslation} from 'react-i18next';
import {switchLanguage} from '../../i18n';

const Settings = (): JSX.Element => {
  const {colors} = useAppSelector(state => state.styles);
  const {user} = useAppSelector(state => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Maybe<Lang>>(user.language);
  const {t} = useTranslation();

  const languagesValues = useMemo(
    () => [
      {label: t('he'), value: 'he'},
      {label: t('en'), value: 'en'},
    ],
    [t],
  );

  const onLanguageChange = async (val: any) => {
    if (val) {
      await switchLanguage(val as Lang);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={font(colors)}>Change language</Text>
      <DropDownPicker
        value={value}
        items={languagesValues}
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={onLanguageChange}
      />
      <MainBtn
        onPress={() => {
          null;
        }}>
        Change theme
      </MainBtn>
    </ScreenWrapper>
  );
};

export default Settings;
