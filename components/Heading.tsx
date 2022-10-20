import clsx from 'clsx'

import {Box} from './Box';

export const Heading = ({as='h1', className, ...props}) => {
  return (
    <Box {...props} as={as} className={clsx('display', className)} />
  );
};
