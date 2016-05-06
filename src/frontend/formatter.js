import moment from 'moment';

export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const HUMAN_WEEKDAY_FORMAT = 'dddd, D MMM';

export const formatTime = (date) => moment(date).format(TIME_FORMAT);
export const formatDate = (date) => moment(date).format(DATE_FORMAT);
export const formatDateTime = (date) => moment(date).format(DATE_TIME_FORMAT);
export const formatDateHuman = (date) => moment(date).format(HUMAN_WEEKDAY_FORMAT);