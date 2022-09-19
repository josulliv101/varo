import React from 'react';

const useScreenSize = () => {
  const getScreenSize = () => {
    const width = Math.max(document?.documentElement?.clientWidth || 0, window?.innerWidth || 0);
    const height = Math.max(document?.documentElement?.clientHeight || 0, window?.innerHeight || 0);
    return ({
      isMobile: width < 600,
      width,
      height,
    });
  };
  const [screenSize, setScreenSize] = React.useState(getScreenSize());
  const handleResize = () => {
    setScreenSize(getScreenSize());
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return screenSize;
};

export default useScreenSize;
