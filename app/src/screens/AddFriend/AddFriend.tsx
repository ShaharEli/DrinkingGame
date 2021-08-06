import React from 'react';
// import {useTranslation} from 'react-i18next';
// import {StyleSheet} from 'react-native';
// import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {AddFriendScreenNavigationProp} from '../../types';
import Title from '../../components/Txts/Title';

interface Props {
  navigation: AddFriendScreenNavigationProp;
}
const AddFriend = ({navigation}: Props): JSX.Element => {
  console.log(navigation);

  // const {user, loadingAuth} = useAppSelector(state => state.user);
  // const {rootStyles, theme, colors} = useAppSelector(state => state.styles);
  // const dispatch = useAppDispatch();
  // const {t, i18n} = useTranslation();

  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title withGoBackIcon tKey="addFriend" />
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default AddFriend;

// const styles = StyleSheet.create({});
