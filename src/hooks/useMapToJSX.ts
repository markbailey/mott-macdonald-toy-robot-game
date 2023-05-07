import { FC, createElement, useId } from 'react';
import useRandomKey from './useRandomKey';

type PropsWithIndex<P> = P & { index: number };
type EmptyArrayFunction = (length: number) => {}[];
type MapToJSXFunction = <P extends {}>(
  items: P[],
  Component: FC<PropsWithIndex<P>>
) => JSX.Element[];

function useMapToJSX(): [MapToJSXFunction, EmptyArrayFunction] {
  const [keyLength, getRandomKey] = useRandomKey();
  const id = useId();

  const getEmptyArray = (length: number) => Array.from({ length }).map(() => ({}));
  const mapToJSX = <P extends {}>(items: P[], Component: FC<PropsWithIndex<P>>) =>
    Array.from(items, (item, index) =>
      createElement(Component, {
        key: getRandomKey(keyLength, id + index),
        index,
        ...item,
      })
    );

  return [mapToJSX, getEmptyArray];
}

export default useMapToJSX;
