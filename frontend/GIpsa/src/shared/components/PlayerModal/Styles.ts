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
    marginTop: 100,
    flex: 1,
    backgroundColor: '#FDF2E7',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
});

export default S;
