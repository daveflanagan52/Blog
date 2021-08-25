import React from 'react';

type LoaderProps = {
  show: boolean,
}

const Loader = ({ show }: LoaderProps) => {
  if (!show) { return <></>; }
  return (
    <div className="loader">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s" />
        </circle>
        {' '}
        <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s" />
        </circle>
        {' '}
        <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s" />
        </circle>
        {' '}
        <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s" />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
