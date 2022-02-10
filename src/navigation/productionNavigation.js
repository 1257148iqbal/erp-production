/**
 * Title: Navigation Menu
 * Description: Navigation Menu
 * Author: Nasir Ahmed
 * Date: 04-January-2022
 * Modified: 04-January-2022
 **/

import { Circle, GitCommit, Sidebar, Zap } from 'react-feather';

export const productionNavigation = [
  {
    id: 'configuration',
    title: 'Configuration',
    icon: <GitCommit size={20} />,
    children: [
      {
        id: 'product-parts',
        title: 'Product Parts',
        icon: <Circle size={20} />,
        navLink: '/product-parts'
      },
      {
        id: 'production-process',
        title: 'Production Process',
        icon: <Circle size={20} />,
        navLink: '/production-process'
      },
      {
        id: 'production-process-sewing',
        title: 'Critical Process (Sewing)',
        icon: <Circle size={20} />,
        navLink: '/critical-process'
      },
      {
        id: 'type-management',
        title: 'Type Management',
        icon: <Circle size={20} />,
        children: [
          {
            id: 'reject-type',
            title: 'Reject Type',
            icon: <Circle size={20} />,
            navLink: '/reject-type'
          },
          {
            id: 'incomplete-type',
            title: 'Incomplete Type',
            icon: <Circle size={20} />,
            navLink: '/incomplete-type'
          },
          {
            id: 'sample-type',
            title: 'Sample Type',
            icon: <Circle size={20} />,
            navLink: '/sample-type'
          }
        ]
      },

      {
        id: 'line',
        title: 'Line',
        icon: <Circle size={20} />,
        navLink: '/line'
      },
      {
        id: 'zone',
        title: 'Zone',
        icon: <Circle size={20} />,
        navLink: '/zone'
      },
      {
        id: 'time',
        title: 'Time',
        icon: <Circle size={20} />,
        navLink: '/time'
      }
    ]
  },
  {
    id: 'operation',
    title: 'Operation',
    icon: <Zap size={20} />,
    children: [
      {
        id: 'cut-plan',
        title: 'Cut Plan',
        icon: <Sidebar size={20} />,
        navLink: '/cut-plan'
      },
      {
        id: 'panel-check',
        title: 'Panel Check',
        icon: <Sidebar size={20} />,
        navLink: '/panel-check'
      },
      {
        id: 'bundle',
        title: 'Bundle',
        icon: <Sidebar size={20} />,
        navLink: '/bundle'
      },
      {
        id: 'external-process',
        title: 'External Process',
        icon: <Sidebar size={20} />,
        navLink: '/external-process'
      },
      {
        id: 'assign-input-table',
        title: 'Assign Input Table',
        icon: <Sidebar size={20} />,
        navLink: '/assign-input-table'
      },
      {
        id: 'assign-target',
        title: 'Assign Target',
        icon: <Sidebar size={20} />,
        navLink: '/assign-target'
      },
      {
        id: 'sewing-inspection',
        title: 'Sewing Inspection',
        icon: <Sidebar size={20} />,
        navLink: '/sewing-inspection'
      },
      {
        id: 'sewing-out',
        title: 'Sewing Out',
        icon: <Sidebar size={20} />,
        navLink: '/sewing-out'
      },
      {
        id: 'wash',
        title: 'Wash',
        icon: <Sidebar size={20} />,
        navLink: '/wash'
      },
      {
        id: 'finishing',
        title: 'Finishing',
        icon: <Sidebar size={20} />,
        navLink: '/finishing'
      },
      {
        id: 'packaging',
        title: 'Packaging',
        icon: <Sidebar size={20} />,
        navLink: '/packaging'
      },
      {
        id: 'shipment',
        title: 'Shipment',
        icon: <Sidebar size={20} />,
        navLink: '/shipment'
      }
    ]
  }
];

/** Change Log
 * 05-Jan-2022(Iqbal): add menu in operation
 */
