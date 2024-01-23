import { intervalToDuration } from 'date-fns'

const CountdownFormat = ({ seconds } : { seconds: number }) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 })

    return `${duration.minutes}:${duration.seconds.toString().padStart(2, '0')}`
}

export default CountdownFormat
