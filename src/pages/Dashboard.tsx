import { useState, useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import ShareModal from "@/components/ShareModal";
import Footer from "@/components/Footer";
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
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedPasar, setSelectedPasar] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const itemsPerPage = 9;

  const { data: apiData, isLoading, error } = usePriceData();
  
  // Use API data if available, otherwise fallback to mock data - show today's data or latest
  const priceData = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const sourceData = (apiData && apiData.length > 0) ? apiData : mockData;
    
    // First try to get today's data
    const todayData = sourceData.filter(item => item.tanggal === today);
    
    if (todayData.length > 0) {
      return todayData;
    }
    
    // If no data for today, get the latest date available
    const sortedData = sourceData.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
    const latestDate = sortedData[0]?.tanggal;
    
    return latestDate ? sourceData.filter(item => item.tanggal === latestDate) : [];
  }, [apiData]);

  // Get unique markets from data
  const markets = useMemo(() => {
    if (!priceData || !Array.isArray(priceData)) return [];
    const uniqueMarkets = [...new Set(priceData.map(item => item?.nama_pasar).filter(Boolean))];
    return uniqueMarkets;
  }, [priceData]);

  const filteredData = useMemo(() => {
    if (!priceData || !Array.isArray(priceData)) {
      return [];
    }
    
    return priceData.filter((item) => {
      // Safe search query check
      const safeSearchQuery = searchQuery || "";
      const safeName = item?.nama || "";
      const matchesSearch = safeName.toLowerCase().includes(safeSearchQuery.toLowerCase());
      
      // Market filter - use selectedPasar (from tabs) if not "all", otherwise use selectedMarket (from dropdown)
      const activeMarketFilter = selectedPasar !== "all" ? selectedPasar : selectedMarket;
      const matchesMarket = activeMarketFilter === "all" || item?.nama_pasar === activeMarketFilter;
      
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
      
      return matchesSearch && matchesMarket && matchesCondition;
    });
  }, [priceData, searchQuery, selectedMarket, selectedPasar, selectedCondition]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

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
          <Button variant="outline" size="sm" onClick={() => setShareModalOpen(true)}>
            <Share className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
        </div>

        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          markets={markets}
        />

        <div className="bg-primary/5 p-4 rounded-lg mb-6">
          <p className="text-sm text-primary flex items-start gap-2">
            <span className="text-primary">ℹ️</span>
            Menampilkan harga rata-rata di Jawa Barat, pilih kota dan pasar untuk harga yang lebih akurat
          </p>
        </div>

        <CategoryTabs
          selectedCategory={selectedPasar}
          setSelectedCategory={setSelectedPasar}
          markets={markets}
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map((item) => {
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
                    komoditiId={item.komoditi_id}
                  />
                  );
                })}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className="w-8 h-8 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}

          {paginatedData.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada data yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </div>
      </div>
      
      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen} 
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;