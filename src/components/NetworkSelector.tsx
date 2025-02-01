import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Network {
  id: string;
  name: string;
}

interface NetworkSelectorProps {
  selectedNetwork: Network;
  setIsNetworkViewOpen: (isOpen: boolean) => void;
}

export function NetworkSelector({
  selectedNetwork,
  setIsNetworkViewOpen,
}: NetworkSelectorProps) {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-3 py-1.5 h-auto text-sm font-normal border-0 bg-[#F2F4F6] hover:bg-[#E8EBED] text-[#24272A] rounded-full focus-visible:ring-0 focus:outline-none"
      onClick={() => setIsNetworkViewOpen(true)}
    >
      <img
        src={`/images/tokens/${selectedNetwork.id}.svg`}
        alt={selectedNetwork.name}
        className="w-4 h-4 rounded-md"
      />
      <span>{selectedNetwork.name}</span>
      <ChevronDown className="h-4 w-4 text-[#24272A]" />
    </Button>
  );
}
