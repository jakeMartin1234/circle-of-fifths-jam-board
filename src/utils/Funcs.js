export const getStoredChordName = (chord) => {
    let stringFlat = "";
    if (chord.length === 2) {
        stringFlat = "b"
    }
    return `${chord[0].toLowerCase()}${stringFlat}Major`
}

export const getDoughnutStyleOuter = (currentNoteIndex, isAnimating, index) => {
    const transforms = [];
    let counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 1;
        if (counter === currentNoteIndex) {
            scale= 1.3;
        }
        transforms.push(`rotate(${i}deg) translateY(-36%)`);
        counter++;
    }

    const textTransforms = [];
    counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 0.8;
        if (counter === currentNoteIndex) {
            scale = 0.6;
        }
        textTransforms.push(`rotate(${i}deg) translateY(-33%) rotate(-${i}deg)`);
        counter++;
    }

    let style = {
        transformOrigin: "center",
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        transform: isAnimating ?
        transforms[index]  :
        `rotate(${index * 30}deg)`,
        opacity: isAnimating ? 1 : 0,
    }

    let textStyle = {
        transformOrigin: "center",
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        transform: isAnimating ?
           textTransforms[index]  :
            `rotate(${index * 30}deg)`,
        opacity: isAnimating ? 1 : 0,
    }

    return [style, textStyle];


}

export const getDoughnutStyleInner = (currentNoteIndex, isAnimating, index) => {
    const transforms = [];
    let counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 0.7;
        transforms.push(`rotate(${i}deg) translateY(-25%) scale(${scale})`);
        counter++;
    }

    const textTransforms = [];
    counter = 0;
    for (let i = 0; i < 360; i += 30) {
        let scale= 0.4;
        textTransforms.push(`rotate(${i}deg) translateY(-23%) rotate(-${i}deg) scale(${scale})`);
        counter++;
    }

    let style = {
        transformOrigin: "center",
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        transform: isAnimating ?
            transforms[index]  :
            `rotate(${index * 30}deg)`,
        opacity: isAnimating ? 1 : 0,
    }

    let textStyle = {
        transformOrigin: "center",
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        transform: isAnimating ?
            textTransforms[index]  :
            `rotate(${index * 30}deg)`,
        opacity: isAnimating ? 1 : 0,
    }

    return [style, textStyle];


}

export default { getStoredChordName, getDoughnutStyleOuter, getDoughnutStyleInner };

