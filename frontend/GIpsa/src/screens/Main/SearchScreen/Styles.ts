import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.background,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default S;
