const soundList = {
    equip3: `${process.env.PUBLIC_URL}/sounds/Equip_3.mp3`,
    engineStart: `${process.env.PUBLIC_URL}/sounds/Engine_start.mp3`,
    button: `${process.env.PUBLIC_URL}/sounds/Button_gameplay.mp3`,
    music: `${process.env.PUBLIC_URL}/sounds/elementary1.mp3`,
}

export type SoundName = keyof typeof soundList

export const play = (name: SoundName, volume?: number) => {
    const sound = new Audio(soundList[name])
    if (volume) sound.volume = volume
    sound.play()
    // sound.addEventListener('ended', () => {
    //     sound.play()
    // })
}
