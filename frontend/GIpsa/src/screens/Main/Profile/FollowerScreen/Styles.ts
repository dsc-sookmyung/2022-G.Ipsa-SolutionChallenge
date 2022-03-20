import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titlecontainer: { alignItems: 'center', marginTop: 41 },
  subcontainer: { alignItems: 'center', marginTop: 30 },
  subcontainer2: { alignItems: 'center', margin: 10 },
});

export default S;
