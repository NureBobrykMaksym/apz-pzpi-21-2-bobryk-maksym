import { DailyAnalytics } from 'src/analytics/types/dailyAnalytics.inteface';
import { MaxDailyAnalytics } from 'src/analytics/types/maxAnalytics.interface';
import { MinDailyAnalytics } from 'src/analytics/types/minAnalytics.interface';

export const getMinDailyAnalytics = (
  dailyAnalytics: DailyAnalytics[],
): MinDailyAnalytics => {
  const minAnalytics = dailyAnalytics.reduce((acc, curr) => {
    const count = +curr.count;
    return count < parseInt(acc.count) ? curr : acc;
  });

  return minAnalytics;
};

export const getMaxDailyAnalytics = (
  dailyAnalytics: DailyAnalytics[],
): MaxDailyAnalytics => {
  const maxAnalytics = dailyAnalytics.reduce((acc, curr) => {
    const count = +curr.count;
    return count > parseInt(acc.count) ? curr : acc;
  });

  return maxAnalytics;
};
