const soundList = {
    button: `${process.env.PUBLIC_URL}/sounds/Button_gameplay.mp3`,
    music: `${process.env.PUBLIC_URL}/sounds/elementary1.mp3`,
    Alert_NO: `${process.env.PUBLIC_URL}/sounds/Alert_NO.mp3`,
    Alert_YES: `${process.env.PUBLIC_URL}/sounds/Alert_YES.mp3`,
    Bazooka: `${process.env.PUBLIC_URL}/sounds/Bazooka.mp3`,
    Crossbow: `${process.env.PUBLIC_URL}/sounds/Crossbow.mp3`,
    Engine_start: `${process.env.PUBLIC_URL}/sounds/Engine_start.mp3`,
    Engine_LOOP_128: `${process.env.PUBLIC_URL}/sounds/Engine_LOOP_128.mp3`,
    Engine_NO_1: `${process.env.PUBLIC_URL}/sounds/Engine_NO_1.mp3`,
    Engine_NO_2: `${process.env.PUBLIC_URL}/sounds/Engine_NO_2.mp3`,
    Engine_stop: `${process.env.PUBLIC_URL}/sounds/Engine_stop.mp3`,
    Equip_1: `${process.env.PUBLIC_URL}/sounds/Equip_1.mp3`,
    Equip_2: `${process.env.PUBLIC_URL}/sounds/Equip_2.mp3`,
    Equip_3: `${process.env.PUBLIC_URL}/sounds/Equip_3.mp3`,
    Equip_4: `${process.env.PUBLIC_URL}/sounds/Equip_4.mp3`,
    Hero_1: `${process.env.PUBLIC_URL}/sounds/Hero_1.mp3`,
    Hero_2: `${process.env.PUBLIC_URL}/sounds/Hero_2.mp3`,
    Jump: `${process.env.PUBLIC_URL}/sounds/Jump.mp3`,
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
export const playEquip = (volume?: number) => {
    const list = ['Equip_1', 'Equip_2', 'Equip_3', 'Equip_4']
    play(list[Math.round(Math.random() * 4)] as SoundName, volume)
}

const engineStart = new Audio(soundList['Engine_start'])

export const playEngine = (volume?: number) => {
    if (volume) engineStart.volume = volume
    const playEnd = () => {
        play('Engine_stop', volume)
        engineStart.removeEventListener('ended', playEnd)
    }
    engineStart.play()
    engineStart.addEventListener('ended', playEnd)
}
