import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.background,
  },
  subcontainer: { alignItems: 'center', marginTop: 31 },
  centercontainer: { alignItems: 'center', marginTop: 22 },
  signInButton: {
    width: 304,
    height: 80,
  },
  profileImg: {
    width: 136,
    height: 136,
    borderRadius: 100,
  },
  touchableText: {
    marginTop: 38,
  },
  container2: {
    marginLeft: 39,
    marginTop: 9,
  },
});

export default S;
