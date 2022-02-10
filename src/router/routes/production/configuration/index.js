/**
 * Title: Entry file for all routes for production reporting module
 * Description: All routes for production reporting modue are imported here and from here all files are exported as item of routes array
 * Author: Nasir Ahmed
 * Date: 21-November-2021
 * Modified: 06-December-2021
 */

import { criticalProcessRoute } from './criticalProcess';
import { lineRoute } from './line';
import { productionProcessRoute } from './productionProcess';
import { productPartsRoute } from './productParts';
import { timeRoute } from './time';
import { incompleteTypeRoute } from './typeManagement/incompleteType';
import { rejectTypeRoute } from './typeManagement/rejectType';
import { sampleTypeRoute } from './typeManagement/sampleType';
import { zoneRoute } from './zone';

export const configurationRoutes = [
  ...lineRoute,
  ...zoneRoute,
  ...productionProcessRoute,
  ...productPartsRoute,
  ...criticalProcessRoute,
  ...timeRoute,
  ...incompleteTypeRoute,
  ...rejectTypeRoute,
  ...sampleTypeRoute
];

/**
 * 06-Dec-2021(Nasir) => change 'item' with'style-category',
 * 06-Jan-2022(Iqbal) => change 'typeManagement, time, criticalProcess',
 **/
