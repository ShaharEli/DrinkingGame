import React, {useState, useMemo, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  KeyboardType,
} from 'react-native';
import MainBtn from '../../components/MainBtn';
import OutlinedTextField from '../../components/OutlinedTextField';
import {WidthContainer, Divider} from '../../styles/styleComponents';
import {assets, MAX_HEIGHT, logger} from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {checkErrors} from './registerHelpers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {bg} from '../../styles/themes/general';
import {registerUser} from '../../redux/slices';
import {useTranslation} from 'react-i18next';
import {Lang} from '../../types';

export default function Register() {
  const dispatch = useAppDispatch();
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  const {loadingAuth} = useAppSelector(state => state.user);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [img, setImg] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const {t, i18n} = useTranslation();

  const fields = useMemo(
    () => [
      {
        label: t('firstName'),
        onChangeText: setFirstName,
        error: errors?.firstName,
      },
      {
        label: t('lastName'),
        onChangeText: setLastName,
        error: errors?.lastName,
      },
      {
        label: t('email'),
        onChangeText: setEmail,
        error: errors?.email,
        keyboardType: 'email-address',
      },
      {
        label: t('password'),
        onChangeText: setPassword,
        error: errors?.password,
        secureTextEntry: true,
      },
      {
        label: t('verifyPass'),
        onChangeText: setRepeatedPassword,
        error: errors?.repeatedPassword,
        secureTextEntry: true,
      },
    ],
    [errors, t],
  );

  useEffect(() => {
    if (Object.values(errors).length)
      checkErrors(
        setErrors,
        password,
        repeatedPassword,
        email,
        firstName,
        lastName,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, repeatedPassword, email, firstName, lastName]);

  const registerNewUser = async () => {
    if (
      checkErrors(
        setErrors,
        password,
        repeatedPassword,
        email,
        firstName,
        lastName,
      )
    )
      return;
    const payload = {
      password,
      avatar: img,
      email,
      firstName,
      lastName,
      language: i18n.language as Lang,
    };
    dispatch(registerUser(payload));
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled
      style={[bg(colors), rootStyles.flex1]}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          rootStyles.spaceBetween,
          rootStyles.mt7,
          {minHeight: MAX_HEIGHT - 125},
        ]}>
        <View>
          <View>
            <Pressable
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true,
                  includeBase64: true,
                  cropperCircleOverlay: true,
                })
                  .then((image: any) => {
                    setImg(`data:${image.mime};base64,${image.data}`);
                  })
                  .catch(({message}) => logger.warn(message));
              }}>
              <Image
                source={img ? {uri: img} : assets.profilePlaceholder}
                style={styles.profilePlaceholder}
              />
            </Pressable>
            {img ? (
              <Icon
                name="highlight-remove"
                size={35}
                color={colors.font}
                style={styles.removeImg}
                onPress={() => setImg('')}
              />
            ) : null}
          </View>
          <Divider m={20} />
          {fields.map(
            ({
              label,
              onChangeText,
              error,
              secureTextEntry = false,
              keyboardType = null,
            }) => (
              <View key={label}>
                <Divider m={15} />
                <WidthContainer>
                  <OutlinedTextField
                    label={label}
                    onChangeText={onChangeText}
                    error={error}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType as KeyboardType | null}
                  />
                </WidthContainer>
              </View>
            ),
          )}
        </View>
        <View style={rootStyles.my5}>
          <MainBtn loading={loadingAuth} onPress={registerNewUser}>
            {t('register')}
          </MainBtn>
          <View
            style={[
              rootStyles.flexRow,
              rootStyles.alignSelfCenter,
              rootStyles.mt5,
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profilePlaceholder: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 150,
  },
  removeImg: {position: 'absolute', right: '25%', top: '65%'},
});
