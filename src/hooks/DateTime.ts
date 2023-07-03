export function GetSelectedCalDate()
{
    const dayIndex = new Date().getDay();
    const getDayName = (dayIndex : number) =>{
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }
    const dayName = getDayName(dayIndex)
    const date = new Date().getDate();

    return dayName + ", " + date
}

export function GetDate()
{
    const dateRef = new Date();
    return  (dateRef.getMonth() + 1) + "/" +  dateRef.getDate() + "/" + dateRef.getFullYear()
}

let DURATION_IN_SECONDS = {
    epochs: ['year', 'month', 'day', 'hour', 'minute'],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
}

function getDuration(seconds : number) {
    let epoch, interval;

    for (let i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
        epoch = DURATION_IN_SECONDS.epochs[i];
        // @ts-ignore
        interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
        if (interval >= 1) {
            return {
                interval: interval,
                epoch: epoch
            };
        }
    }

}

function timeSince(date : string) {
    // @ts-ignore
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let duration = getDuration(seconds);
    // @ts-ignore
    let suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
    // @ts-ignore
    return duration.interval + ' ' + duration.epoch + suffix + " ago";
}

export default {
    timeSince
}
