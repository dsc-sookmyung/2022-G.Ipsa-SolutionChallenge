import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#FDF2E7',
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    textAlign: 'center',
  },
  container2: {
    marginTop: 19,
    alignItems: 'center',
    textAlign: 'center',
  },

  thumbnail: {
    alignItems: 'center',
    width: 288,
    height: 288,
    marginTop: 24,
    borderRadius: 8,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: '#FDF2E7',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
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
    backgroundColor: '#C4C4C4',
  },
  titleText: {
    marginTop: 30,
  },
  artistText: {
    marginTop: 9,
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#000000',
    fontVariant: ['tabular-nums'],
  },
  actionRowContainer: {
    width: '60%',
    flexDirection: 'row',
    marginBottom: 100,
    justifyContent: 'space-between',
  },
  primaryActionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  secondaryActionButton: {
    fontSize: 14,
    color: '#000000',
  },
});

export default S;
