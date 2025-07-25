import { useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { usePriceData } from "@/hooks/useApi";

// Mock data untuk fallback
const mockData = [
  {
    id: 1,
    komoditi: "Bawang Bombay",
    satuan: "kg",
    harga: 39818,
    perubahan_persen: 5.43,
    perubahan_nominal: 2050,
    trend_data: [35000, 36000, 37000, 38000, 39000, 39500, 39818]
  },
  {
    id: 2,
    komoditi: "Bawang Merah",
    satuan: "kg",
    harga: 50872,
    perubahan_persen: 4.71,
    perubahan_nominal: 2290,
    trend_data: [48000, 48500, 49000, 49500, 50000, 50500, 50872]
  },
  {
    id: 3,
    komoditi: "Bawang Putih",
    satuan: "kg",
    harga: 36035,
    perubahan_persen: -1.29,
    perubahan_nominal: -471,
    trend_data: [37000, 36800, 36600, 36400, 36200, 36100, 36035]
  },
  {
    id: 4,
    komoditi: "Bawang Putih Cutting",
    satuan: "kg",
    harga: 43960,
    perubahan_persen: 2.15,
    perubahan_nominal: 925,
    trend_data: [42500, 42800, 43000, 43200, 43500, 43750, 43960]
  },
  {
    id: 5,
    komoditi: "Beras Medium",
    satuan: "kg",
    harga: 13397,
    perubahan_persen: -0.85,
    perubahan_nominal: -115,
    trend_data: [13600, 13550, 13500, 13450, 13400, 13397, 13397]
  },
  {
    id: 6,
    komoditi: "Beras Premium",
    satuan: "kg",
    harga: 14762,
    perubahan_persen: 1.23,
    perubahan_nominal: 179,
    trend_data: [14500, 14550, 14600, 14650, 14700, 14730, 14762]
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: apiData, isLoading, error } = usePriceData();
  
  // Use API data if available, otherwise fallback to mock data
  const priceData = useMemo(() => {
    if (apiData && apiData.length > 0) {
      return apiData;
    }
    return mockData;
  }, [apiData]);

  const filteredData = useMemo(() => {
    return priceData.filter((item) => {
      const matchesSearch = item.komoditi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCondition = 
        selectedCondition === "all" ||
        (selectedCondition === "naik" && item.perubahan_persen > 0) ||
        (selectedCondition === "turun" && item.perubahan_persen < 0) ||
        (selectedCondition === "tetap" && item.perubahan_persen === 0);
      
      return matchesSearch && matchesCondition;
    });
  }, [priceData, searchQuery, selectedCondition]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Eksplorasi Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Dashboard Pangan</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard Pangan Provinsi Jawa Barat
          </h1>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
        </div>

        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
        />

        <div className="bg-primary/5 p-4 rounded-lg mb-6">
          <p className="text-sm text-primary flex items-start gap-2">
            <span className="text-primary">ℹ️</span>
            Menampilkan harga rata-rata di Jawa Barat, pilih kota dan pasar untuk harga yang lebih akurat
          </p>
        </div>

        <CategoryTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="py-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-card rounded-lg p-4 h-48">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-6 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gagal memuat data. Menampilkan data contoh.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.komoditi}
                  price={item.harga}
                  unit={item.satuan}
                  changePercent={item.perubahan_persen}
                  changeAmount={item.perubahan_nominal}
                  trendData={item.trend_data}
                />
              ))}
            </div>
          )}

          {filteredData.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada data yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;