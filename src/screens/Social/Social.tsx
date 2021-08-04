import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import FriendListItem from '../../components/FriendListItem';
import Txt from '../../components/Txts/Txt';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {SocialScreenNavigationProp} from '../../types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {titelize} from '../../utils';
interface Props {
  navigation: SocialScreenNavigationProp;
}
const Social = ({navigation}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {rootStyles, theme, colors} = useAppSelector(state => state.styles);
  const {user, loadingAuth} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

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
