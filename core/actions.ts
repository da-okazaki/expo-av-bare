import { Audio } from 'expo-av';

export const onPressSound = async (rate: number) => {
  const { sound } = await Audio.Sound.createAsync(require('../lesson_1_1.mp3'));
  await sound.setRateAsync(rate, true);
  const checkLoaded = await sound.getStatusAsync();
  console.log('checkLoaded', checkLoaded);

  await sound.playAsync();
  console.log('onPressSound');
};
