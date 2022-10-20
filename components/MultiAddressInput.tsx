import clsx from 'clsx'
import { ethers } from 'ethers';
import { WithContext as ReactTags } from 'react-tag-input';

import { ADDRESS_DELIM } from '../config/constants';
// import { shortenAddress } from '../utils/shortenAddress';

import { Dismiss } from './Dismiss';
import { ScrollBox } from './ScrollBox';

const Remove = ({onRemove, className, ...props}) => {
  return (
    <Dismiss 
      {...props} 
      alt="Remove item"
      onClick={onRemove}
      className={(clsx(className, 'pl-[.75rem]'))}
    />
  );
};

export const MultiAddressInput = ({handleAdd, handleRemove, ...props}) => {
  return (
    <ScrollBox className='h-[10rem]'>
      <ReactTags 
        {...props}
        delimiters={ADDRESS_DELIM}
        placeholder={'0x\u2026'}
        classNames={{
          tags: 'w-full h-full',
          tag: 'flex w-fit rounded-full bg-n0 font-mono text-n6 text-xs leading-none px-2 py-1.5 mr-2 mb-2',
          tagInputField: 'w-full bg-transparent focus:ring-0 border-0 border-b-2 placeholder-shown:border-n3 border-n0 focus:border-b1 text-n0 placeholder:text-n4 px-0',
        }}
        removeComponent={Remove}
        handleAddition={(tag) => {
          const addr = ethers.utils.getAddress(tag.text); // TODO error handling and user feedback
          // tag.text = shortenAddress(addr);
          tag.text = addr;
          return handleAdd(tag);
        }}
        handleDelete={(i) => {
          return handleRemove(i);
        }}
        onClick={(e) => {
          // prevent click from removing tag
          e.preventDefault();
        }}
        handleTagClick={(i, e) => {
          // prevent click from removing tag
          e.preventDefault();
        }}
        allowDragDrop={false}
        editable={false}
      />
    </ScrollBox>
  );
};
