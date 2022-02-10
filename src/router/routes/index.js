import { accountRoutes } from './accountRoutes';
import { authRoutes } from './authRoutes';
import { productionRoutes } from './production';

// ** Document title
const TemplateTitle = '%s - ERP';

// ** Default Route
const DefaultRoute = '/home';

// ** Merge Routes
const Routes = [...authRoutes, ...accountRoutes, ...productionRoutes];

export { DefaultRoute, TemplateTitle, Routes };
