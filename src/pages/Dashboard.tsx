import { useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { usePriceData } from "@/hooks/useApi";

// Mock data untuk fallback dengan struktur API yang benar
const mockData = [
  {
    id: 1,
    komoditi_id: 19,
    nama: "Bawang Bombay",
    foto: "komoditi/January2024/tepcwDcugMfllSYMBG7Y.jpg",
    tanggal: "2025-07-25",
    harga: 39818,
    harga_sebelumnya: 37768,
    nama_satuan: "kg",
    nama_pasar: "Pasar Kawali"
  },
  {
    id: 2,
    komoditi_id: 16,
    nama: "Bawang Merah",
    foto: "komoditi/January2024/6XcZ2QyKBssfvmJ0ILxz.jpg",
    tanggal: "2025-07-25",
    harga: 50872,
    harga_sebelumnya: 48582,
    nama_satuan: "kg",
    nama_pasar: "Pasar Kawali"
  },
  {
    id: 3,
    komoditi_id: 17,
    nama: "Bawang Putih",
    foto: "komoditi/January2024/yQatAEtva1RFMjzfsxkV.jpg",
    tanggal: "2025-07-25",
    harga: 36035,
    harga_sebelumnya: 36506,
    nama_satuan: "kg",
    nama_pasar: "Pasar Kawali"
  },
  {
    id: 4,
    komoditi_id: 2,
    nama: "Beras Medium",
    foto: "komoditi/December2023/Mw3htpIO0hlY4XTb7ISZ.jpg",
    tanggal: "2025-07-25",
    harga: 13397,
    harga_sebelumnya: 13512,
    nama_satuan: "kg",
    nama_pasar: "Pasar Kawali"
  },
  {
    id: 5,
    komoditi_id: 1,
    nama: "Beras Premium",
    foto: "komoditi/December2023/3LwwcT1mazHuUgTWcrwc.jpeg",
    tanggal: "2025-07-25",
    harga: 14762,
    harga_sebelumnya: 14583,
    nama_satuan: "kg",
    nama_pasar: "Pasar Kawali"
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
    if (!priceData || !Array.isArray(priceData)) {
      return [];
    }
    
    return priceData.filter((item) => {
      // Safe search query check
      const safeSearchQuery = searchQuery || "";
      const safeName = item?.nama || "";
      const matchesSearch = safeName.toLowerCase().includes(safeSearchQuery.toLowerCase());
      
      // Calculate percentage change safely
      const currentPrice = item?.harga || 0;
      const previousPrice = item?.harga_sebelumnya || 0;
      const percentChange = previousPrice > 0 
        ? ((currentPrice - previousPrice) / previousPrice) * 100 
        : 0;
      
      const matchesCondition = 
        selectedCondition === "all" ||
        (selectedCondition === "naik" && percentChange > 0) ||
        (selectedCondition === "turun" && percentChange < 0) ||
        (selectedCondition === "tetap" && percentChange === 0);
      
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
              {filteredData.map((item) => {
                // Calculate percentage and nominal change
                const percentChange = item.harga_sebelumnya > 0 
                  ? ((item.harga - item.harga_sebelumnya) / item.harga_sebelumnya) * 100 
                  : 0;
                const nominalChange = item.harga - item.harga_sebelumnya;
                
                // Create image URL if foto exists
                const imageUrl = item.foto 
                  ? `https://situ.ciamiskab.go.id/storage/${item.foto}`
                  : undefined;
                
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.nama}
                    price={item.harga}
                    unit={item.nama_satuan}
                    changePercent={percentChange}
                    changeAmount={nominalChange}
                    image={imageUrl}
                    trendData={[]} // No trend data in API response
                  />
                );
              })}
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