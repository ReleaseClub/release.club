import React from 'react';

export const Box = ({ as = 'div', ...props }) => {
  return React.createElement(as, props);
};
