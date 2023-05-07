import { useEffect } from 'react';

type Element = HTMLElement | Window | MediaQueryList | null;

// Hook for adding event listeners to elements (inc Window).
// This will make it easier to setup event listeners without writing all the boilerplate code each time.
// @param {string} eventType - The event type to listen for.
// @param {function} callback - The callback to run when the event is triggered.
// @param {Element} element - The element to listen for the event on.
function useEventListener(
  eventType: string,
  callback: EventListenerOrEventListenerObject,
  element: Element = window
) {
  useEffect(() => {
    if (element === null) return;
    element.addEventListener(eventType, callback);
    return () => element.removeEventListener(eventType, callback);
  }, [eventType, element, callback]);
}

export default useEventListener;
