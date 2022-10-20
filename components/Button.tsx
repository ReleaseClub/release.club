import clsx from 'clsx'

import {Box} from './Box';

export const Button = ({as='button', className, ...props}) => {
  return (
    <Box {...props} as={as} className={clsx('btn', className)} />
  );
};
