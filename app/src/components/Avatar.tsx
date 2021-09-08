import React from 'react';
import {Image, ImageStyle, StyleSheet, View} from 'react-native';
import {assets} from '../utils';
interface Props {
  size?: number;
  img: string;
  style?: ImageStyle;
  isActive?: boolean;
  tagged?: boolean;
}

const Avatar = ({
  size = 50,
  img,
  style = {},
  isActive = false,
  tagged = false,
}: Props): JSX.Element => {
  return (
    <View>
      <Image
        style={[
          {width: size, height: size, borderRadius: size},
          tagged && styles.tagged,
          style,
        ]}
        source={img ? {uri: img} : assets.profilePlaceholder}
      />
      {isActive && <View style={styles.onlineIndicator} />}
    </View>
  );
};

export default Avatar;
const ONLINE_INDICATOR_SIZE = 15;

const styles = StyleSheet.create({
  onlineIndicator: {
    width: ONLINE_INDICATOR_SIZE,
    height: ONLINE_INDICATOR_SIZE,
    borderRadius: ONLINE_INDICATOR_SIZE,
    backgroundColor: '#21dd21',
    position: 'absolute',
  },
  tagged: {
    borderWidth: 1,
    borderColor: 'cyan',
  },
});
