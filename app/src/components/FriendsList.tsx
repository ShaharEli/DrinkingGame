import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useAppSelector} from '../hooks';
import {IFriend} from '../types';
import FriendListItem from './FriendListItem';
import Txt from './Txts/Txt';

interface Props {
  loading: boolean;
  addOptionOn?: boolean;
  data: IFriend[];
  isSearcing: boolean;
}

const FriendsList = ({
  loading,
  addOptionOn = false,
  data,
  isSearcing,
}: Props): JSX.Element => {
  const {rootStyles, colors} = useAppSelector(state => state.styles);
  const {t} = useTranslation();

  return (
    <FlatList
      bounces={false}
      data={data}
      ListEmptyComponent={
        loading ? (
          <View style={rootStyles.alignSelfCenter}>
            <ActivityIndicator size="small" color={colors.ANTI_COLOR} />
          </View>
        ) : isSearcing && !loading ? (
          <View style={[rootStyles.alignCenter, rootStyles.my3]}>
            <Txt>{t('friendsNotFound')}</Txt>
          </View>
        ) : null
      }
      contentContainerStyle={rootStyles.py4}
      keyExtractor={({_id}) => _id}
      renderItem={({item}) => (
        <FriendListItem {...item} addOptionOn={addOptionOn} />
      )}
    />
  );
};

export default FriendsList;
