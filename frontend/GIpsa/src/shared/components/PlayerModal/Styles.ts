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
    marginTop: 80,
    flex: 1,
    backgroundColor: '#FDF2E7',
    alignItems: 'center',
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
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryActionButton: {
    width: 68,
    height: 68,
  },
  secondaryActionButton: {
    width: 30,
    height: 35,
  },
  thirdActionButton: {
    width: 30,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  topBarContainer: {
    paddingHorizontal: 20,
    width: '60%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  likecontainer: {
    marginTop: 10,
    marginStart: 200,
    marginBottom: 10,
  },
  heart: {
    width: 34,
    height: 34,
  },
});

export default S;

// <View style={S.topBarContainer}>
//   <TouchableWithoutFeedback
//     onPress={() => TrackPlayer.JumpBackward()}
//   >
//     <Image
//       style={S.secondaryActionButton}
//       source={require('../../assets/images/rewind-button.png')}
//     />
//   </TouchableWithoutFeedback>
//   <TouchableWithoutFeedback
//     onPress={() => TrackPlayer.JumpForward()}
//   >
//     <Image
//       style={S.secondaryActionButton}
//       source={require('../../assets/images/forward-button.png')}
//     />
//   </TouchableWithoutFeedback>
// </View>;
