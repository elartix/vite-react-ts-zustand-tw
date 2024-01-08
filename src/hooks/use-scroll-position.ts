import { useRef, DependencyList, MutableRefObject, useLayoutEffect, useEffect } from 'react';

interface IPosition {
  x: number;
  y: number;
}

interface IScrollProps {
  prevPos: IPosition;
  currPos: IPosition;
}

export type MutableElementRef = MutableRefObject<HTMLElement | null | undefined>;

const isBrowser = typeof window !== 'undefined';
const zeroPosition = { x: 0, y: 0 };

const getClientRect = (element?: HTMLElement | null | undefined) => element?.getBoundingClientRect();

export type ScrollPosition = {
  element?: MutableElementRef | undefined | null;
  boundingElement?: MutableElementRef;
  useWindow?: boolean;
}

const getScrollPosition = ({ element, useWindow, boundingElement }: ScrollPosition) => {
  if (!isBrowser) {
    return zeroPosition;
  }

  if (useWindow) {
    return { x: window.scrollX, y: window.scrollY };
  }

  const targetPosition = getClientRect(element?.current || document.body);
  const containerPosition = getClientRect(boundingElement?.current);

  if (!targetPosition) {
    return zeroPosition;
  }

  return containerPosition
    ? {
      x: (containerPosition.x || 0) - (targetPosition.x || 0),
      y: (containerPosition.y || 0) - (targetPosition.y || 0),
    }
    : { x: targetPosition.left, y: targetPosition.top };
};

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export const useScrollPosition = (
  effect: (props: IScrollProps) => void,
  deps?: DependencyList,
  element?: MutableElementRef | undefined | null,
  useWindow?: boolean,
  wait?: number,
  boundingElement?: MutableElementRef,
): void => {
  const position = useRef(getScrollPosition({ element, useWindow, boundingElement }));

  let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow, boundingElement });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handleScroll = () => {
      if (wait) {
        if (!throttleTimeout) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    callBack();

    if (boundingElement) {
      boundingElement.current?.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      document.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (boundingElement) {
        boundingElement.current?.removeEventListener('scroll', handleScroll);
      } else {
        document.removeEventListener('scroll', handleScroll);
      }

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
  boundingElement: false,
};
