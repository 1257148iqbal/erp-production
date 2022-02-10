import './account/moduleApi';
import './account/roleApi';
import './account/todo';
import './account/userApi';
import './jwt';
import mock from './mock';
import './production/configuration/criticalProcessMock';
import './production/configuration/incompleteTypeMock';
import './production/configuration/lineMock';
import './production/configuration/productionProcessMock';
import './production/configuration/productPartsMock';
import './production/configuration/rejectTypeMock';
import './production/configuration/sampleTypeMock';
import './production/configuration/timeMock';
import './production/configuration/zoneMock';
import './production/operation/assignInputTableMock';
import './production/operation/assignTargetMock';
import './production/operation/bundleMock';
import './production/operation/cutPlanMock';
import './production/operation/externalProcessMock';
import './production/operation/panelCheckMock';
import './production/operation/sewingInspectionMock';

mock.onAny().passThrough();
