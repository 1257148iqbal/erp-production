/**
 * Title: time Routes
 * Description: Route navigation for time routes
 * Author: Iqbal Hossain
 * Date: 06-January-2022
 * Modified: 06-January-2022
 */

import { lazy } from 'react';

export const timeRoute = [
  {
    path: '/time',
    exact: true,
    component: lazy(() => import('views/production/configuration/time/list/TimeList'))
  },
  {
    path: '/time-new',

    component: lazy(() => import('views/production/configuration/time/form/TimeAddForm'))
  },
  {
    path: '/time-details',

    component: lazy(() => import('views/production/configuration/time/details/TimeDetails'))
  }
];
