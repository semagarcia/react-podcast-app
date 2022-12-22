import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.styles.scss';

/**
 * Component for rendering an app header, which has a title that acts as a home link and a spinner that
 * will be shown when the app is navigating (or requesting a navigation) - the spinner could not be
 * visible due to fast navigation on localhost
 */
const Header = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    return () => {
      // This small timeout is for the loader, in order to force it
      setTimeout(() => setIsLoading(false), 50);
    };
  }, [location]);

  return (
    <div className="header flex-row bottom-border">
      <div className="app-title">
        <Link to={'/'}>Podcaster</Link>
      </div>
      <div className="flex-row loading">
        {isLoading && (
          <svg viewBox="0 0 100 100">
            <path
              d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
              fill="#e15b64"
              stroke="none"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="1s"
                repeatCount="indefinite"
                keyTimes="0;1"
                values="0 50 51;360 50 51"
              ></animateTransform>
            </path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Header;
