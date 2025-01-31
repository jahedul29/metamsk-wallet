import { useEffect, useRef } from "react";
import MetaMaskOnboardingLogo from "@metamask/logo";

const MetamaskLogo = () => {
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoContainerRef.current) {
      // Clear any existing child elements in the container
      logoContainerRef.current.innerHTML = "";

      // Initialize the MetaMask logo
      const logo = MetaMaskOnboardingLogo({
        pxNotRatio: true,
        width: 200,
        height: 200,
        followMouse: true,
      });

      // Append the logo canvas
      logoContainerRef.current.appendChild(logo.container);

      // Cleanup on component unmount
      return () => {
        logo.stopAnimation();
      };
    }
  }, []);

  return <div ref={logoContainerRef}></div>;
};

export default MetamaskLogo;
