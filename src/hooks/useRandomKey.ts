import { useId, useRef } from 'react';

type GetKeyFunction = (length?: number, cacheKeySuffix?: string) => string;
const DEFAULT_LENGTH = 8;

// Generate a random string of a determined length
export function randomString(length: number = DEFAULT_LENGTH) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

function useRandomKey(): [number, GetKeyFunction] {
  const cacheRef = useRef<Map<string, string>>(new Map());
  const cacheKeyPrefix = useId();

  const getRandomKey = (length: number = DEFAULT_LENGTH, cacheKeySuffix: string = '') => {
    const cache = cacheRef.current;
    const cacheKey = `${cacheKeyPrefix}${cacheKeySuffix}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey)!;

    const newKey = randomString(length);
    cache.set(cacheKey, newKey);
    return newKey;
  };

  return [DEFAULT_LENGTH, getRandomKey];
}

export default useRandomKey;
