import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreVertical, X, Search, Plus, PencilLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SelectNetworkViewProps {
  onClose: () => void;
  handleNetworkChange: (network: { id: string; name: string }) => void;
  selectedNetworkId: string;
}

const networkSections = [
  {
    section: "Enabled networks",
    networks: [
      {
        name: "Ethereum Mainnet",
        id: "eth",
        enabled: true,
      },
      {
        id: "linea",
        name: "Linea Mainnet",
        enabled: true,
      },
    ],
  },
  {
    section: "Additional networks",
    networks: [
      {
        id: "arbitrum",
        name: "Arbitrum One",
        enabled: false,
      },
      {
        id: "avax",
        name: "Avalanche Network C-Chain",
        enabled: false,
      },
      {
        id: "base",
        name: "Base Mainnet",
        enabled: false,
      },
      {
        id: "bnb",
        name: "Binance Smart Chain",
        enabled: false,
      },
      {
        id: "optimism",
        name: "OP Mainnet",
        enabled: false,
      },
      {
        id: "pol",
        name: "Polygon Mainnet",
        enabled: false,
      },
      {
        id: "zk-sync",
        name: "zkSync Era Mainnet",
        enabled: false,
      },
    ],
  },
];

export const SelectNetworkView: React.FC<SelectNetworkViewProps> = ({
  onClose,
  handleNetworkChange,
  selectedNetworkId,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter networks based on search query
  const filteredSections = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return networkSections;
    }

    const query = searchQuery.toLowerCase();
    return networkSections.map(section => ({
      ...section,
      networks: section.networks.filter(network =>
        network.name.toLowerCase().includes(query)
      )
    })).filter(section => section.networks.length > 0);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-md space-y-4 text-neutral-900 bg-gray-600 p-3 relative">
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-black text-center w-full">Select a network</h2>

          <X className="h-5 w-5" onClick={onClose} />
        </div>

        <div className="py-4 pt-1 h-[440px] overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-white">
          <div className="relative mx-4">
            <Input
              type="text"
              placeholder="Search"
              startContent={<Search className="h-4 w-4" />}
              className="w-full border-slate-500 focus-visible:ring-[#0376c9]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex gap-2 mt-4 min-h-[76px] mx-4">
            {/* <div className="bg-blue-100 rounded p-1"> */}
            <img src="/dragging-animation.svg" alt="" className="w-[44px]" />
            {/* </div> */}
            <span className="text-sm font-medium">
              You can drag networks to reorder them.
            </span>

            <X className="h-6 w-6" />
          </div>

          {filteredSections.map((section) => (
            <div key={section.section}>
              <h3 className="text-sm font-semibold text-gray-500 p-4 mt-4">
                {section.section}
              </h3>
              <div>
                {section.networks.map((network) => (
                  <div
                    key={network.id}
                    className={`flex items-center p-1 h-[56px] ${
                      (selectedNetworkId === network.id && section.section === "Enabled networks")
                        ? "bg-[#0376c91a] hover:bg-[#0376c91a]"
                        : section.section === "Enabled networks"
                          ? "hover:bg-gray-50"
                          : ""
                    }`}
                    onClick={() => {
                      handleNetworkChange({
                        id: network.id,
                        name: network.name,
                      });
                      onClose();
                    }}
                  >
                    <div className="w-1 h-full">
                      {network.id === selectedNetworkId ? (
                        <div className="w-1 h-full bg-blue-600 rounded-full"></div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between gap-2 w-full p-4 pl-2">
                      <img
                        src={`/images/tokens/${network.id}.svg`}
                        alt=""
                        className="w-[22px] h-[22px] rounded-md"
                      />
                      <span className="flex-grow text-sm font-medium ml-2">
                        {network.name}
                      </span>
                      {section.section === "Enabled networks" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          {/* <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-gray-100 rounded-full"
                        > */}
                          <MoreVertical className="h-4 w-4" />
                          {/* </Button> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[230px] p-0"
                        >
                          <DropdownMenuItem className="flex items-center gap-3 py-4 cursor-pointer text-neutral-900 font-semibold">
                            <PencilLine className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      ) : (
                        <Button
                      variant="link"
                      size="icon"
                      className="h-8 w-8 font-semibold"
                    >
                      Add
                    </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="text-center p-4 text-gray-500">
              No networks found matching "{searchQuery}"
            </div>
          )}
        </div>
        <div className="p-4 flex justify-center items-center">
          <Button
            variant="outline"
            className="w-full justify-center gap-0 text-sm text-[#0376c9] hover:text-white hover:bg-[#0376c9] border-[#0376c9] rounded-full h-[48px] font-semibold border-1"
          >
            <Plus className="w-5 h-5 mr-1.5" />
            Add a custom network
          </Button>
        </div>
      </div>
    </div>
  );
};
