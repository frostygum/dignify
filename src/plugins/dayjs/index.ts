import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import type { App } from 'vue';

// Extend dayjs with the plugin
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(localizedFormat);


export default {
  install: (app: App) => {
    // Provide a global dayjs instance
    app.provide('djs', dayjs);
  },
};