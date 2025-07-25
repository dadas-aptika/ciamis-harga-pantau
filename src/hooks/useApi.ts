import { useQuery } from "@tanstack/react-query";

interface PriceData {
  id: number;
  komoditi_id: number;
  nama: string;
  foto: string;
  tanggal: string;
  harga: number;
  harga_sebelumnya: number;
  nama_satuan: string;
  nama_pasar: string;
}

interface CommodityData {
  id: number;
  nama: string;
  kategori: string;
  satuan: string;
  harga_rata_rata: number;
  perubahan_persen: number;
  perubahan_nominal: number;
  gambar?: string;
}

export const usePriceData = () => {
  return useQuery<PriceData[]>({
    queryKey: ['priceData'],
    queryFn: async () => {
      const response = await fetch('https://situ.ciamiskab.go.id/api/perkembangan-harga-sebulan');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Transform the data to match our interface
      return data.data || data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCommodityById = (id: number) => {
  return useQuery<CommodityData>({
    queryKey: ['commodity', id],
    queryFn: async () => {
      const response = await fetch(`https://situ.ciamiskab.go.id/api/get-komoditi-by-id/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data || data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};