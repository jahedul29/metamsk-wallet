import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import MetamaskLogo from './MetamaskLogo';
import { NetworkSelector } from './NetworkSelector';

interface Network {
  id: string;
  name: string;
}

export function WalletButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    id: 'eth',
    name: 'Ethereum Mainnet',
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleConnect = () => {
    setIsOpen(false);
  };

  const handleUnlock = () => {
    if (password === '123456') {
      setIsOpen(false);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="bg-amber-600 hover:bg-amber-700 border-none text-white hover:text-white font-bold"
        size="lg"
      >
        Connect Wallet
      </Button>
      <DialogContent className="sm:max-w-[357px] h-[600px] p-0 bg-white border-0 shadow-xl fixed right-0 top-0">
        {isLoading ? (
          <div className="h-[600px] flex flex-col items-center justify-center">
            <img src="/logo.svg" alt="Loading..." className="w-40 h-40 animate-pulse" />
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-100 shadow-sm flex justify-between items-center">
              <div className="p-3">
                <NetworkSelector
                  selectedNetwork={selectedNetwork}
                  onNetworkChange={setSelectedNetwork}
                />
              </div>
              <div className="p-3">
                <img src="/logo.svg" alt="logo" className="w-10 h-10" />
              </div>
            </div>
            <div className="p-6 flex flex-col items-center mt-5">
              <MetamaskLogo />
              <h2 className="text-[24px] leading-tight font-bold text-slate-500 tracking-tight mt-1">
                Welcome back!
              </h2>
              <p className="text-slate-900 mb-16 font-normal">
                The decentralized web awaits
              </p>
              
              <div className="w-full space-y-7">
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className={`text-slate-900 w-full py-1 border-b-2 focus:outline-none placeholder-slate-500 font-normal bg-transparent px-0 ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#43AEFC]'}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnlock();
                      }
                    }}
                  />
                  {error && <p className="text-red-600 text-xs mt-1 font-medium">{error}</p>}
                </div>
                
                <Button 
                  className="w-full h-[46px] bg-[#43AEFC] hover:bg-[#348bc8] text-white rounded-[100px] font-bold text-sm"
                  onClick={handleUnlock}
                  disabled={password.length === 0}
                >
                  Unlock
                </Button>
                
                <div className="flex justify-center">
                  <a 
                    href="#" 
                    className="text-[#0376C9] hover:text-[#0372C3] font-semibold text-xs"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div className="mt-9 text-xs text-slate-700 font-medium">
                Need help? Contact{' '}
                <a 
                  href="#" 
                  className="text-[#0376C9] hover:text-[#0372C3] font-medium"
                >
                  MetaMask support
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}