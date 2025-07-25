import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedMarket: string;
  setSelectedMarket: (market: string) => void;
  selectedCondition: string;
  setSelectedCondition: (condition: string) => void;
  markets: string[];
}

const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedMarket,
  setSelectedMarket,
  selectedCondition,
  setSelectedCondition,
  markets
}: FilterSectionProps) => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari Komoditas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium whitespace-nowrap">Pilih Pasar</span>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Pasar</SelectItem>
                  {markets.map((market) => (
                    <SelectItem key={market} value={market}>{market}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium whitespace-nowrap">Kondisi Harga</span>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="naik">Naik</SelectItem>
                  <SelectItem value="turun">Turun</SelectItem>
                  <SelectItem value="tetap">Tetap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Harga Turun</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span>Harga Naik</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Harga Tetap</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;