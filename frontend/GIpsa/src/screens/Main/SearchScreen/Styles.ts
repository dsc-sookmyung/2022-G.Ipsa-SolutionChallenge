import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.background,
    height: '100%',
    alignItems: 'center',
  },
  results: {
    width: '100%',
    paddingTop: 28,
  },
});

export default S;
