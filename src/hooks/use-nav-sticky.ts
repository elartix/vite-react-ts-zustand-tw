import { useState } from 'react';
import { type MutableElementRef, useScrollPosition } from './use-scroll-position';

export interface UseNavStickyOutput {
  isSticky: boolean,
}

export interface NavStickyOptions {
  stickyScrollDelay?: number,
  stickyScrollOffsetTrigger: number,
  stickyScrollUseWindow?: boolean,
  stickyScrollElement?: MutableElementRef | undefined | null
}

const defaultOptions: NavStickyOptions = {
  stickyScrollDelay: 180,
  stickyScrollUseWindow: true,
  stickyScrollOffsetTrigger: 100,
  stickyScrollElement: null
};

export const useNavSticky = (options?: NavStickyOptions): UseNavStickyOutput => {
  const stickyOptions: NavStickyOptions = {
    ...defaultOptions,
    ...options || {}
  };

  const [isSticky, setSticky] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y >= stickyOptions.stickyScrollOffsetTrigger) {
      setSticky(() => true);
    } else {
      setSticky(() => false);
    }
  }, [setSticky], stickyOptions.stickyScrollElement, stickyOptions.stickyScrollUseWindow, stickyOptions.stickyScrollDelay);

  return {
    isSticky,
  };
};
