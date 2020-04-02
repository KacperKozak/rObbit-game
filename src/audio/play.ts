export const soundList = {
    equip3: '/sounds/Equip_3.mp3',
    button: '/sounds/Button_gameplay.mp3',
    music: '/sounds/elementary1.mp3',
}

export const play = (name: 'equip3' | 'button' | 'music', volume?: number) => {
    const sound = new Audio(soundList[name])
    if (volume) sound.volume = volume
    sound.play()
    // sound.addEventListener('ended', () => {
    //     sound.play()
    // })
}
