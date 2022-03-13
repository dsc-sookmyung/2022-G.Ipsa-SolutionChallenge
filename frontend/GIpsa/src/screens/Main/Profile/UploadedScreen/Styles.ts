import { StyleSheet } from 'react-native';

const S = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 41,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 31,
  },
  signInButton: {
    width: 304,
    height: 80,
    marginLeft: 28,
    marginTop: 21,
  },
  dateAlign: {
    marginTop: 56,
    marginLeft: 52,
    marginRight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numbers: {
    fontSize: 36,
    fontWeight: '700',
    color: '#F98B65',
    textAlign: 'center',
  },
  text1: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default S;
