import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';

const S = StyleSheet.create({
  container: {
    width: 360,
    height: 55,
    position: 'absolute',
    top: 550,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  screenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    marginLeft: 18,
  },
  queueButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  artwork: {
    width: 45,
    height: 45,
    marginBottom: 2,
    borderRadius: 1,
    backgroundColor: '#C4C4C4',
  },
  titleText: {
    marginTop: 8,
  },
  artistText: {
    marginBottom: 2,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryActionButton: {
    marginTop: 14,
    marginLeft: 180,
    width: 16,
    height: 22,
  },
  secondaryActionButton: {
    marginTop: 14,
    marginLeft: 24,
    width: 20,
    height: 24,
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
