export const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | undefined>) => {
  if (soundRef.current) {
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  }
};