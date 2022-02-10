/*
     Title: Process Routes
     Description: Route Navigation for process route
     Author: Iqbal Hossain
     Date: 21-November-2021
     Modified: 21-November-2021
*/

import { lazy } from 'react';

export const productionProcessRoute = [
  {
    path: '/production-process',
    exact: true,
    component: lazy(() =>
      import('views/production/configuration/productionProcess/list/ProductionProcessList')
    )
  },
  {
    path: '/production-process-new',

    component: lazy(() =>
      import('views/production/configuration/productionProcess/form/ProductionProcessAddForm')
    )
  },
  {
    path: '/production-process-details',

    component: lazy(() =>
      import('views/production/configuration/productionProcess/details/ProductionProcessDetails')
    )
  }
];
