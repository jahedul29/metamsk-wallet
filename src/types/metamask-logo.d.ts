declare module '@metamask/logo' {
  interface MetaMaskLogoOptions {
    pxNotRatio?: boolean;
    width?: number;
    height?: number;
    followMouse?: boolean;
  }

  interface MetaMaskLogo {
    container: HTMLElement;
    stopAnimation(): void;
  }

  export default function createMetaMaskLogo(options: MetaMaskLogoOptions): MetaMaskLogo;
} 