import { StyleSheet } from 'react-native';

import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default S;
