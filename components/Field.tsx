import clsx from 'clsx';
import { cloneElement, useId } from 'react';

import {Box} from './Box';

const _className = 'flex flex-col';

export const Field = ({className, label, children, ...props}) => {
  const id = useId();
  const labelId = `${id}-label`;
  const contentProps = {
    id,
    'aria-labelledby': labelId,
  };

  return (
    <>
      <Box as="label" id={labelId} htmlFor={id} className={clsx(_className, className)} {...props}>
        <span className="font-satoshi text-base text-n2 leading-[1.5]">{label}</span>
      </Box>
      <div {...contentProps}>
        {children}
      </div>
    </>
  );
};
