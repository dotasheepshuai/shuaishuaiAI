import {Anniversaries} from './constants';
import {isEmpty, filter} from 'lodash';
import moment from 'moment';

export function isAnniversary() {
    return !isEmpty(getAnniversaryDetails());
}

/**
 * [{componentName:, date:, years:}]
 */
export function getAnniversaryDetails() {
    const anniversaries = filter(Anniversaries, (anniversary) => {
        const historyMoment = moment(anniversary.date);
        const currentMoment = moment();
        return (
            (historyMoment.month() === currentMoment.month()) &&
            (historyMoment.date() === currentMoment.date())
        );
    });
    anniversaries.forEach((anniversary) => {
        const historyMoment = moment(anniversary.date);
        const currentMoment = moment();
        anniversary.years = currentMoment.year() - historyMoment.year();
    });
    return anniversaries;
}