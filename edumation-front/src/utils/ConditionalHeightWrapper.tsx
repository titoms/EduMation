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

  const wrapperClass = `flex-grow w-full p-4 ${
    applyScreenHeight ? 'h-screen' : 'h-auto'
  }`;

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      {children}
    </div>
  );
};

export default ConditionalHeightWrapper;
