/// <reference types="vite/client" />

namespace globalThis {
  declare interface Event {
    matches: boolean;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}
