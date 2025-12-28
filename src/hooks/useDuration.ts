import dayjs from 'dayjs';
import duration, { type Duration } from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Extend dayjs with the plugin
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

export const useDateTime = () => {

  const secondsToDuration = (totalSeconds: number): Duration => {
    return dayjs
      .duration(totalSeconds, 'seconds')
  }

  const secondsToFormattedTime = (seconds: number, format: string = 'mm:ss'): string => {
    return secondsToDuration(seconds).format(format);
  }

  return {
    secondsToFormattedTime
  }
}
