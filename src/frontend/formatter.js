import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const formatDate = (date) => moment(date).format(DATE_FORMAT);

export const formatDateTime = (date) => moment(date).format(DATE_TIME_FORMAT);