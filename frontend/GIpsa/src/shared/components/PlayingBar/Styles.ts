import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 60,
    backgroundColor: colors.background,
    borderTopColor: colors.gray1,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  artwork: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
  },
  clickArea: {
    flex: 1,
  },

  primaryActionButton: {
    marginRight: 20,
    width: 16,
    height: 22,
  },
  secondaryActionButton: {
    width: 20,
    height: 24,
  },
});

export default S;
