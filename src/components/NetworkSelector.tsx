import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface Network {
  id: string;
  name: string;
}

const networks: Network[] = [
  { id: 'eth', name: 'Ethereum Mainnet' },
  { id: 'polygon', name: 'Polygon Mainnet' },
  { id: 'binance', name: 'Binance Smart Chain' },
];

interface NetworkSelectorProps {
  selectedNetwork: Network;
  onNetworkChange: (network: Network) => void;
}

export function NetworkSelector({ selectedNetwork, onNetworkChange }: NetworkSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-1.5 h-auto text-sm font-normal border-0 bg-[#F2F4F6] hover:bg-[#E8EBED] text-[#24272A] rounded-full focus-visible:ring-0 focus:outline-none"
        >
          <img src={`/images/tokens/${selectedNetwork.id}.svg`} alt={selectedNetwork.name} className="w-4 h-4 rounded-md" />
          <span>{selectedNetwork.name}</span>
          <ChevronDown className="h-4 w-4 text-[#24272A]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => onNetworkChange(network)}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          >
            <img src={`/images/tokens/${network.id}.svg`} alt={network.name} className="w-4 h-4 rounded-md" />
            <span>{network.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}