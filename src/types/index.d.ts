/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    requirejs: any;
    require: any;
  }
  interface HTMLLinkElement {
    loaded?: Promise<void>;
  }

  interface HTMLScriptElement {
    loaded?: Promise<void>;
  }
}
