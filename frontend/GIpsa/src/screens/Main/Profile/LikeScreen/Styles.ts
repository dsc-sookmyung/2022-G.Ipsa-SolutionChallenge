import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titlecontainer: { alignItems: 'center', marginTop: 41 },
  subcontainer: { alignItems: 'center' },
});

export default S;
