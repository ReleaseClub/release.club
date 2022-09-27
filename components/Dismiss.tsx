import clsx from 'clsx';
import dismiss from '../public/images/dismiss.svg';

const _className = '';

export const Dismiss = ({className, alt, ...props}) => {
  return (
    <button {...props} className={clsx(_className, className)}>
      <img {...dismiss} alt={alt ? alt : "Dismiss"}/>
    </button>
  );
};

