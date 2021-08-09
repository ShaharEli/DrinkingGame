import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import FriendListItem from '../../components/FriendListItem';
import Txt from '../../components/Txts/Txt';
import {useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {SocialScreenNavigationProp} from '../../types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {calcFriendRequests, titelize} from '../../utils';
import MainBtn from '../../components/MainBtn';
import If from '../../components/If';
import {fontS} from '../../styles/themes/general';
interface Props {
  navigation: SocialScreenNavigationProp;
}
const Social = ({navigation}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {rootStyles, colors} = useAppSelector(state => state.styles);
  const {user} = useAppSelector(state => state.user);

  return (
    <ScreenWrapper>
      <WidthContainer>
        <View
          style={[
            rootStyles.flexRow,
            rootStyles.alignCenter,
            rootStyles.spaceBetween,
          ]}>
          <Txt style={[rootStyles.mb3, rootStyles.h3]}>
            {titelize(t('friends'))}
          </Txt>
          <If cond={!!calcFriendRequests(user)}>
            <MainBtn
              style={styles.sqrBtn}
              textStyle={fontS(12)}
              onPress={() => navigation.navigate('FriendRequests')}>
              {t('gotFriendRequest', {num: calcFriendRequests(user)})}
            </MainBtn>
          </If>
          <AntDesign
            name="adduser"
            size={30}
            color={colors.font}
            onPress={() => navigation.navigate('AddFriend')}
          />
        </View>
        <FlatList
          keyExtractor={({_id}) => _id}
          data={user.friends}
          renderItem={({item}) => (
            <FriendListItem {...item} {...{navigation}} />
          )}
        />
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default Social;

const styles = StyleSheet.create({
  sqrBtn: {
    width: 150,
    borderRadius: 10,
  },
});
