const getMaxTime = subthemes => subthemes.map(({ duration }) => duration)
    .reduce((a, b) => a + b, 0)

export default getMaxTime
