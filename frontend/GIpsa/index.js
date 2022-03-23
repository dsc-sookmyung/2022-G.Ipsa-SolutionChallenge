/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigator/App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>
  require('./src/screens/Main/CreateScreen/ListenScreen/service')
);
