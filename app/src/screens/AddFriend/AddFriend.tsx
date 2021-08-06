import React, {useState} from 'react';
// import {useTranslation} from 'react-i18next';
// import {StyleSheet} from 'react-native';
// import {useAppDispatch, useAppSelector} from '../../hooks';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {IFriend} from '../../types';
import Title from '../../components/Txts/Title';
import {useDebounce} from '../../hooks';
import {searchFriends} from '../../api';
import {View} from 'react-native';
import OutlinedTextField from '../../components/OutlinedTextField';
import {useTranslation} from 'react-i18next';
import FriendsList from '../../components/FriendsList';

const AddFriend = (): JSX.Element => {
  const [input, setInput] = useState('');

  // const {user, loadingAuth} = useAppSelector(state => state.user);
  // const {rootStyles, theme, colors} = useAppSelector(state => state.styles);
  // const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {debouncedValue, loading, setArgValue} = useDebounce<string, IFriend[]>(
    input,
    [],
    searchFriends,
    500,
    txt => !!txt.length,
  );

  return (
    <ScreenWrapper>
      <WidthContainer>
        <Title withGoBackIcon tKey="addFriend" />
        <View>
          <OutlinedTextField
            onChangeText={txt => {
              setInput(txt);
              setArgValue(txt);
            }}
            label={t('searchFriend')}
            value={input}
          />
          <FriendsList
            loading={loading}
            data={debouncedValue}
            addOptionOn
            isSearcing={!!input.length}
          />
        </View>
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default AddFriend;

// const styles = StyleSheet.create({});
