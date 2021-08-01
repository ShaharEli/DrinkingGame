import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {bg} from '../../styles/themes/general';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScrollView} from 'react-native-gesture-handler';
import {MAX_HEIGHT, phoneReg} from '../../utils';
import {Divider, Logo, WidthContainer} from '../../styles/styleComponents';
import OutlinedTextField from '../../components/OutlinedTextField';
import {loginWithPass} from '../../redux/slices';
import {ILoginErrors, LoginScreenNavigationProp} from '../../types';
import MainBtn from '../../components/MainBtn';

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {colors, rootStyles} = useAppSelector(state => state.styles);

  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ILoginErrors>({});
  const checkErrors = () => {
    let errorOccured;
    if (phone.length < 10) {
      setErrors(prev => ({
        ...prev,
        phone: 'Phone number missing digits',
      }));
      errorOccured = true;
    } else {
      if (phoneReg.test(phone)) {
        setErrors(prev => ({...prev, phone: 'Phone not valid'}));
        errorOccured = true;
      } else {
        setErrors(prev => ({...prev, phone: null}));
      }
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
    dispatch(loginWithPass({phone, password}));
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
              label={'phone'}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              error={errors?.phone}
            />
          </WidthContainer>
          <Divider m={15} />
          <WidthContainer>
            <OutlinedTextField
              label={'password'}
              onChangeText={setPassword}
              error={errors?.password}
              secureTextEntry
            />
          </WidthContainer>
        </View>
        <Divider m={15} />
        <View style={rootStyles.mb5}>
          <MainBtn onPress={login}>Sign in</MainBtn>
          <View
            style={[
              rootStyles.flexRow,
              rootStyles.alignSelfCenter,
              rootStyles.mt5,
            ]}>
            <Text
              style={[
                {color: colors.GREY},
                rootStyles.me1,
                rootStyles.fontSize16,
              ]}>
              Not with us?
            </Text>
            <Text
              onPress={() => navigation.navigate('Register')}
              style={[{color: colors.GREEN_PRIMARY}, rootStyles.fontSize16]}>
              register
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
