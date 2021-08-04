import React, {useMemo, useState} from 'react';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppDispatch, useAppSelector, useDebounce} from '../../hooks';
import MainBtn from '../../components/MainBtn';
import {Color, Lang, Maybe} from '../../types';
import {useTranslation} from 'react-i18next';
import {switchLanguage} from '../../i18n';
import {editUserData, toggleTheme} from '../../redux/slices';
import Txt from '../../components/Txts/Txt';
import {StyleSheet} from 'react-native';
import OutlinedTextField from '../../components/OutlinedTextField';
import {checkUserName} from '../../api';
import {useEffect} from 'react';
import AvatarPicker from '../../components/AvatarPicker';
// TODO style!!!
const Settings = (): JSX.Element => {
  const {rootStyles, theme, colors} = useAppSelector(state => state.styles);
  const {user, loadingAuth} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Maybe<Lang>>(user.language);
  const [userName, setUserName] = useState(user.userName);
  const [img, setImg] = useState(user.avatar);
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

  const {debouncedValue, loading, setArgValue} = useDebounce<
    string,
    Promise<boolean> | boolean
  >(userName, true, checkUserName, 500, newData => newData.length > 5);

  useEffect(() => {
    setArgValue(user.userName);
    setUserName(user.userName);
    setImg(user.avatar);
  }, [user, setArgValue]);

  useEffect(() => {
    if (img === user.avatar || loadingAuth) return;
    dispatch(editUserData({avatar: img}));
  }, [img, user, dispatch, loadingAuth]);

  const userNameError = useMemo<boolean>(
    () =>
      (!loading && userName !== user.userName && !debouncedValue) ||
      userName.length < 6,
    [userName, debouncedValue, user, loading],
  );
  const userNameValid = useMemo<boolean>(
    () => !userNameError && userName !== user.userName,
    [userNameError, userName, user],
  );

  return (
    <ScreenWrapper>
      <WidthContainer style={rootStyles.my3}>
        <Txt style={[rootStyles.mb3, rootStyles.h3]}>{t('settings')}</Txt>
        <AvatarPicker {...{img, setImg}} />
      </WidthContainer>
      <MainBtn
        style={{
          ...rootStyles.alignSelfStart,
          ...rootStyles.ms5,
          ...rootStyles.mt3,
        }}
        onPress={() => {
          dispatch(toggleTheme());
        }}>
        {t('toggleTheme', {theme: t(theme === 'dark' ? 'light' : 'dark')})}
      </MainBtn>
      <WidthContainer
        style={{
          ...rootStyles.my5,
          ...rootStyles.flexRow,
          ...rootStyles.alignCenter,
        }}>
        <OutlinedTextField
          label={t('userName')}
          containerStyle={rootStyles.flex1}
          onChangeText={e => {
            setArgValue(e);
            setUserName(e);
          }}
          tintColor={userNameValid && (colors.GREEN as Color)}
          error={
            userNameError
              ? userName.length < 6
                ? t('tooShort', {arg: t('userName')})
                : t('userNameInUse')
              : null
          }
          value={userName}
        />
        <MainBtn
          style={styles.changeUserNameBtn}
          textStyle={styles.changeUserNameTxt}
          disabled={!userNameValid}
          onPress={() => dispatch(editUserData({userName}))}
          loading={loading || loadingAuth}>
          {t('changeUserName')}
        </MainBtn>
      </WidthContainer>
      <WidthContainer style={rootStyles.my5}>
        <DropDownPicker
          theme={theme.toUpperCase()}
          value={value}
          items={languagesValues}
          listItemLabelStyle={styles.labelStyle}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          labelStyle={styles.labelStyle}
          onChangeValue={onLanguageChange}
        />
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  labelStyle: {textAlign: 'left'},
  changeUserNameBtn: {
    width: 100,
    marginStart: 5,
    borderRadius: 10,
    marginBottom: 5,
  },

  changeUserNameTxt: {fontSize: 10},
});
