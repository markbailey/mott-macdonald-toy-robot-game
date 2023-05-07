import { act, renderHook } from '@testing-library/react';
import useMapToJSX from '../hooks/useMapToJSX';
import { HTMLAttributes, createElement } from 'react';

const Component = (props: HTMLAttributes<HTMLDivElement>) => createElement('div', props);

describe('useMapToJSX', () => {
  it('should return array of empty objects', () => {
    const { result } = renderHook(() => useMapToJSX());
    const [, getEmptyArray] = result.current;
    const array = getEmptyArray(10);
    expect(array).toHaveLength(10);
    expect(array[0]).toEqual({});
  });

  it('should return array of JSX elements', () => {
    const { result } = renderHook(() => useMapToJSX());
    const [mapToJSX] = result.current;
    const array = mapToJSX([{ id: 'test' }], Component);

    expect(array).toHaveLength(1);
    expect(typeof array[0].key).toEqual('string');
    expect(array[0].props).toEqual({ id: 'test', index: 0 });
  });

  it('key should be unique', () => {
    const { result } = renderHook(() => useMapToJSX());
    const [mapToJSX] = result.current;
    const array = mapToJSX([{ id: 'test' }, { id: 'test2' }], Component);

    expect(array).toHaveLength(2);
    expect(array[0].key).not.toEqual(array[1].key);
  });
});
