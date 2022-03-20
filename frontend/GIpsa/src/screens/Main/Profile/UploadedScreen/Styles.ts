import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.background,
  },
  titlecontainer: { alignItems: 'center', marginTop: 41 },
  subcontainer: { alignItems: 'center', marginTop: 31 },
  centercontainer: { alignItems: 'center' },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  numMargin: {
    marginTop: 9,
  },
  dateAlign: {
    marginTop: 56,
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default S;
