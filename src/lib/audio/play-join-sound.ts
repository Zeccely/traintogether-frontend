let joinSound: HTMLAudioElement | null = null;

export async function playJoinSound() {
  joinSound ??= new Audio("/floraphonic-cute-level-up-2-189851.mp3");
  joinSound.currentTime = 0;

  await joinSound.play();
}
