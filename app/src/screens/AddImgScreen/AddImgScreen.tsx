import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import MainBtn from '../../components/MainBtn';
import Tag from '../../components/Tag';
import Title from '../../components/Txts/Title';
import Txt from '../../components/Txts/Txt';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addImgToDareAction} from '../../redux/actions';
import {ScreenWrapper, WidthContainer} from '../../styles/styleComponents';
import {
  AddFriendScreenNavigationProp,
  AddImageScreenRouteProps,
} from '../../types';

interface Props {
  route: AddImageScreenRouteProps;
  navigation: AddFriendScreenNavigationProp;
}

const AddImgScreen = ({route, navigation}: Props) => {
  const {
    game: {participants, _id: gameId, type},
    loadingGame,
  } = useAppSelector(state => state.game);

  const {dareId, img} = route.params;

  const {rootStyles} = useAppSelector(state => state.styles);

  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  const {
    user: {friends},
  } = useAppSelector(state => state.user);

  const [tags, setTags] = useState(() => {
    if (type === 'local') {
      return friends.map(friend => ({...friend, tagged: false}));
    } else {
      return participants.map(friend => ({...friend, tagged: false}));
    }
  });

  const onTagPressed = (tagId: string) => {
    setTags(prev =>
      prev.map(tag =>
        tag._id === tagId ? {...tag, tagged: !tag.tagged} : tag,
      ),
    );
  };

  return (
    <ScreenWrapper>
      <Title withGoBackIcon tKey="addImg" />
      <WidthContainer>
        <Image source={{uri: img}} style={styles.img} />
        <Txt style={rootStyles.alignSelfCenter}>{t('tagFriend')}</Txt>
        <FlatList
          contentContainerStyle={rootStyles.mt3}
          horizontal
          data={tags}
          keyExtractor={({_id}) => _id}
          renderItem={({item}) => <Tag {...{...item, onPress: onTagPressed}} />}
        />

        <MainBtn
          disabled={loadingGame}
          onPress={() => {
            dispatch(
              addImgToDareAction({
                dareId,
                img,
                gameId,
                tagged: tags.filter(e => e.tagged).map(p => p._id),
              }),
            );
            navigation.goBack();
          }}>
          {t('addImg')}
        </MainBtn>
      </WidthContainer>
    </ScreenWrapper>
  );
};

export default AddImgScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '65%',
  },
});
