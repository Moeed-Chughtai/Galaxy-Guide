export function ExtractPlanetData(data) {
    const { englishName, moons, mass: { massValue }, density, gravity, meanRadius, avgTemp } = data;
    return {
        englishName,
        noOfMoons: moons ? moons.length: 0,
        moons: moons ? moons.map(moon => moon.moon) : [],
        avgTemp,
        mass: massValue,
        meanRadius,
        gravity,
        density
    };
}
