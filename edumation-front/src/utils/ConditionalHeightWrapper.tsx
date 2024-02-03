import { useEffect, useRef, useState } from 'react';

const ConditionalHeightWrapper = ({ children }) => {
  const wrapperRef = useRef(null);
  const [applyScreenHeight, setApplyScreenHeight] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (wrapperRef.current) {
        const elementHeight = wrapperRef.current.getBoundingClientRect().height;
        const screenHeight = window.innerHeight;
        setApplyScreenHeight(elementHeight < screenHeight);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, [children]);

  const wrapperClass = `flex-grow w-full min-h-screen p-4 mb-24 ${
    applyScreenHeight ? '' : ''
  }`;

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      {children}
    </div>
  );
};

export default ConditionalHeightWrapper;
