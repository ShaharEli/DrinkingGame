import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {bg} from '../../styles/themes/general';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScrollView} from 'react-native-gesture-handler';
import {emailReg, MAX_HEIGHT} from '../../utils';
import {Divider, Logo, WidthContainer} from '../../styles/styleComponents';
import OutlinedTextField from '../../components/OutlinedTextField';
import {loginWithPassAction} from '../../redux/actions';
import {ILoginErrors, LoginScreenNavigationProp} from '../../types';
import MainBtn from '../../components/MainBtn';
import Txt from '../../components/Txts/Txt';

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ILoginErrors>({});
  const checkErrors = () => {
    let errorOccured;
    if (!emailReg.test(email)) {
      setErrors(prev => ({...prev, email: 'Email not valid'}));
      errorOccured = true;
    } else {
      setErrors(prev => ({...prev, email: null}));
    }

    if (password.length < 6) {
      setErrors(prev => ({...prev, password: 'Password too short'}));
      errorOccured = true;
    } else {
      setErrors(prev => ({...prev, password: null}));
    }
    return errorOccured;
  };

  const login = async () => {
    if (checkErrors()) return;
    dispatch(loginWithPassAction({email, password}));
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
          {minHeight: MAX_HEIGHT - 125},
        ]}>
        <View>
          <Divider m={20} />
          <Logo mv={30} />
          <Divider m={20} />
          <WidthContainer>
            <OutlinedTextField
              label={t('email')}
              keyboardType="email-address"
              onChangeText={setEmail}
              error={errors?.email}
            />
          </WidthContainer>
          <Divider m={15} />
          <WidthContainer>
            <OutlinedTextField
              label={t('password')}
              onChangeText={setPassword}
              error={errors?.password}
              secureTextEntry
            />
          </WidthContainer>
        </View>
        <Divider m={15} />
        <View style={rootStyles.mb5}>
          <MainBtn onPress={login}>{t('login')}</MainBtn>
          <View
            style={[
              rootStyles.flexRow,
              rootStyles.alignSelfCenter,
              rootStyles.mt5,
            ]}>
            <Txt
              style={[
                {color: colors.GREY},
                rootStyles.me1,
                rootStyles.fontSize16,
              ]}>
              {t('notWithUs')}
            </Txt>
            <Text
              onPress={() => navigation.navigate('Register')}
              style={[{color: colors.GREEN_PRIMARY}, rootStyles.fontSize16]}>
              {t('register')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
