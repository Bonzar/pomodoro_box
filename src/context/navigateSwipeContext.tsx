import type { PropsWithChildren, RefObject } from "react";
import { createContext, useContext, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useLocation } from "react-router-dom";

/**
 * Handle left and right swiping and provide boolean flag of current swipe state
 *
 * Used in Page component for disabling animation on IOS Safari swipe left/right to navigate back/forward
 */
const navigateSwipeContext = createContext<RefObject<boolean> | null>(null);

export const NavigateSwipeProvider = ({ children }: PropsWithChildren) => {
  const isSwipingStarted = useRef(false);

  const resetSwipingState = () => {
    isSwipingStarted.current = false;
  };

  const delayedSwipeStatusReset = () => {
    setTimeout(resetSwipingState, 10);
  };

  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      isSwipingStarted.current = true;
    },
    onSwipedLeft: delayedSwipeStatusReset,
    onSwipedRight: delayedSwipeStatusReset,
    onSwipedUp: resetSwipingState,
    onSwipedDown: resetSwipingState,
  });

  const location = useLocation();

  useEffect(() => {
    if (isSwipingStarted.current) {
      resetSwipingState();
    }
  }, [location.pathname]);

  return (
    <div {...swipeHandlers}>
      <navigateSwipeContext.Provider value={isSwipingStarted}>
        {children}
      </navigateSwipeContext.Provider>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavigateSwipeContext = () => {
  const swipe = useContext(navigateSwipeContext);

  if (swipe === null) {
    throw new Error(
      "Can't use `useNavigateSwipeContext` outside of `NavigateSwipeProvider`"
    );
  }

  return Boolean(swipe.current);
};
