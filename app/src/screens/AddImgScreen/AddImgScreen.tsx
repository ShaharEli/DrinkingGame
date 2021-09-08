import React, {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Tag from '../../components/Tag';
import Title from '../../components/Txts/Title';
import {useAppSelector} from '../../hooks';
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
    game: {participants, _id, type},
  } = useAppSelector(state => state.game);

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
        <Image source={{uri: route.params.img}} style={styles.img} />
      </WidthContainer>
      {tags.map(({avatar, _id, tagged}) => (
        <Tag key={_id} {...{_id, avatar, tagged, onPress: onTagPressed}} />
      ))}
      <Text />
    </ScreenWrapper>
  );
};

export default AddImgScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '80%',
  },
});
