import { act, renderHook } from '@testing-library/react';
import useRandomKey from '../hooks/useRandomKey';

describe('useRandomKey', () => {
  it('should return random key', () => {
    const { result } = renderHook(() => useRandomKey());
    const [keyLength, getRandomKey] = result.current;
    const key = getRandomKey();
    expect(key).toHaveLength(keyLength);
  });

  it('should return same key for same cache key', () => {
    const { result, rerender } = renderHook(() => useRandomKey());
    const [, getRandomKey] = result.current;
    const key = getRandomKey();

    act(() => rerender());
    const key2 = getRandomKey();
    expect(key).toEqual(key2);
  });

  it('should return different key for different cache key', () => {
    const { result } = renderHook(() => useRandomKey());
    const [, getRandomKey] = result.current;
    const key = getRandomKey();
    const key2 = getRandomKey(10, 'test');
    expect(key).not.toEqual(key2);
  });
});
