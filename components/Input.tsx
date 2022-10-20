import clsx from 'clsx';

import {Box} from './Box';

const inputClassName = 'w-full bg-transparent focus:ring-0 border-0 border-b-2 placeholder-shown:border-n3 border-n0 focus:border-b1 text-n0 placeholder:text-n4 px-0';

export const Input = ({ type='text', className='', ...props }) => {
  return (
    <Box {...props} as="input" type={type} className={clsx(inputClassName, className)} />
  );
};
