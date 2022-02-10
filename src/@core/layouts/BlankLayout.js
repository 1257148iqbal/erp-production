// ** React Imports
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import { useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
const BlankLayout = ({ children, ...rest }) => {
  // ** Hooks
  // eslint-disable-next-line no-unused-vars
  const [skin, setSkin] = useSkin();

  // ** States
  const [isMounted, setIsMounted] = useState(false);

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="blank-page">
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
