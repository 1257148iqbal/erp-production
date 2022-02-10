// ** React Imports
// ** Horizontal Menu Array
import navigation from '@src/navigation/horizontal';
import { useState } from 'react';
import ERPLogo from '../../navbar/ERPLogo';
import ModuleSideBar from '../../navbar/ModuleSideBar';
import UserDropdown from '../../navbar/UserDropdown';
// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems';

const HorizontalMenu = ({ currentActiveItem, routerProps }) => {
  // ** States
  const [activeItem, setActiveItem] = useState(null);
  const [groupActive, setGroupActive] = useState([]);
  const [openDropdown, setOpenDropdown] = useState([]);

  // ** On mouse enter push the ID to openDropdown array
  const onMouseEnter = id => {
    const arr = openDropdown;
    arr.push(id);
    setOpenDropdown([...arr]);
  };

  // ** On mouse leave remove the ID to openDropdown array
  const onMouseLeave = id => {
    const arr = openDropdown;
    arr.splice(arr.indexOf(id), 1);
    setOpenDropdown([...arr]);
  };

  return (
    <div className="navbar-header navbar-container main-menu-content d-flex">
      <ul className="nav navbar-nav align-items-center  ">
        <ERPLogo />
      </ul>
      <ul className="nav navbar-nav align-items-center mr-1  ">
        {/* <ModuleDropdown />  */}
        <ModuleSideBar />
      </ul>

      <ul className="nav navbar-nav align-items-center" id="main-menu-navigation">
        <HorizontalNavMenuItems
          submenu={false}
          items={navigation}
          activeItem={activeItem}
          groupActive={groupActive}
          routerProps={routerProps}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          openDropdown={openDropdown}
          setActiveItem={setActiveItem}
          setGroupActive={setGroupActive}
          setOpenDropdown={setOpenDropdown}
          currentActiveItem={currentActiveItem}
        />
      </ul>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <UserDropdown />
      </ul>
    </div>
  );
};

export default HorizontalMenu;
