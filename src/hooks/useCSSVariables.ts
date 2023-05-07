import { useEffect } from 'react';

type VariableKey = `--${string}`;
type CSSVariables = Record<VariableKey, string | number>;

function useCSSVariables(variables: CSSVariables) {
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(variables))
      root.style.setProperty(key, value as string);
  }, [variables]);
}

export default useCSSVariables;
