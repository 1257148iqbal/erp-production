import { criticalProcessReducer } from 'views/production/configuration/criticalProcess/store/reducers';
import { lineReducer } from 'views/production/configuration/line/store/reducers';
import { productionProcessReducer } from 'views/production/configuration/productionProcess/store/reducers';
import { productPartReducer } from 'views/production/configuration/productParts/store/reducers';
import { timeReducer } from 'views/production/configuration/time/store/reducers';
import { incompleteTypeReducer } from 'views/production/configuration/typeManagement/incompleteType/store/reducers';
import { rejectTypeReducer } from 'views/production/configuration/typeManagement/rejectType/store/reducers';
import { sampleTypeReducer } from 'views/production/configuration/typeManagement/sampleType/store/reducers';
import { zoneReducer } from 'views/production/configuration/zone/store/reducers';
import { assignInputTableReducer } from 'views/production/operation/assignInputTable/store/reducers';
import { assignTargetReducer } from 'views/production/operation/assignTarget/store/reducers';
import { bundleReducer } from 'views/production/operation/bundle/store/reducers';
import { cutPlanReducer } from 'views/production/operation/cutPlan/store/reducers';
import { externalProcessReducer } from 'views/production/operation/externalProcess/store/reducers';
import { panelCheckReducer } from 'views/production/operation/panelCheck/store/reducers';
import { sewingInspectionReducer } from 'views/production/operation/sewingInspection/store/reducers';

export const productionReducers = {
  lineReducer,
  sampleTypeReducer,
  zoneReducer,
  productPartReducer,
  productionProcessReducer,
  criticalProcessReducer,
  rejectTypeReducer,
  incompleteTypeReducer,
  timeReducer,
  cutPlanReducer,
  panelCheckReducer,
  bundleReducer,
  externalProcessReducer,
  assignInputTableReducer,
  assignTargetReducer,
  sewingInspectionReducer
};
