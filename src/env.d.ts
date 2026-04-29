/// <reference types="astro/client" />

declare module "@pagefind/default-ui" {
  interface PagefindUIOptions {
    element: string | HTMLElement;
    showSubResults?: boolean;
    resetStyles?: boolean;
    [key: string]: unknown;
  }
  export class PagefindUI {
    constructor(options: PagefindUIOptions);
  }
}
