import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000077',
  },
  screenContainer: {
    backgroundColor: '#FDF2E7',
    alignItems: 'center',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  queueButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  artwork: {
    width: 288,
    height: 288,
    marginTop: 24,
    borderRadius: 8,
  },
  titleText: {
    marginTop: 30,
  },
  artistText: {
    marginTop: 9,
  },

  progressContainer: {
    height: 40,
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    fontVariant: ['tabular-nums'],
  },

  actionRowContainer: {
    width: '75%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryActionButton: {
    width: 40,
    height: 40,
  },
  secondaryActionButton: {
    width: 30,
    height: 35,
  },
  thirdActionButton: {
    width: 28,
    height: 28,
  },

  likecontainer: {
    marginTop: 24,
    width: '100%',
    paddingRight: 40,
    alignItems: 'flex-end',
  },
  heart: {
    width: 34,
    height: 34,
  },
});

export default S;
