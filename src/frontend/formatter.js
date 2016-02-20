import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

export const formatDate = (date) => moment(date).format(DATE_FORMAT);