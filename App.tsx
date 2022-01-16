import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { onPressSound } from './core/actions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Audio } from 'expo-av';

import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const Home = () => {
  const [recording, setRecording] = React.useState();

  const navigation: any = useNavigation();
  const onPressNavigation = () => {
    navigation.navigate('Second');
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording }: any = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: uri });
    await sound.playAsync();
  }
  return (
    <View style={styles.container}>
      <Button
        title="sound"
        onPress={() => {
          onPressSound(0.7);
        }}
      />
      <Button
        title="sound"
        onPress={() => {
          onPressSound(1.0);
        }}
      />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="次へ" onPress={onPressNavigation} />
    </View>
  );
};

const Second = () => {
  return (
    <View style={styles.container}>
      <Button
        title="sound"
        onPress={() => {
          onPressSound(1.0);
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Second" component={Second} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
