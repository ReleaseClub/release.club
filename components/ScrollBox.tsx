import clsx from 'clsx'
import { Box } from './Box';

const _className = 'flex rounded-lg border border-n3 focus-within:border-b1 p-[1rem] pr-[.75rem]';

export const ScrollBox = ({className, children, ...props}) => {
  return (
    <Box {...props} className={clsx(_className, className)}>
      <div className="grow self-stretch overflow-y-auto overscroll-contain scrollbar-thin scrollbar-n3 pr-[1.25rem]">
        {children}
      </div>
    </Box>
  );
};
