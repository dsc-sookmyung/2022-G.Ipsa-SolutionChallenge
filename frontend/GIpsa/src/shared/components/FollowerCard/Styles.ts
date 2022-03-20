import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    // marginRight: 31,
    // marginTop: 108,
    backgroundColor: colors.background,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container3: {
    marginLeft: 18,
  },
  thumbnail: {
    width: 67,
    height: 67,
    marginBottom: 24,
    borderRadius: 1,
  },

  creator: {
    marginLeft: 2,
    fontSize: 14,
  },
});

export default S;
