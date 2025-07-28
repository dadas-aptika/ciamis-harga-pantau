import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, X, FileImage, FileText, FileBarChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from "@/hooks/use-toast";

interface PriceChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  chartData: Array<{
    date: string;
    [market: string]: number | string;
  }>;
  markets: string[];
}

// Colors for different market lines
const marketColors = [
  "#22c55e", // green
  "#06b6d4", // cyan  
  "#1e40af", // blue
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#f97316", // orange
  "#10b981", // emerald
];

const PriceChartModal = ({ 
  open, 
  onOpenChange, 
  productName, 
  chartData, 
  markets 
}: PriceChartModalProps) => {
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: 'short' 
    });
  };

  const downloadAsPNG = async () => {
    try {
      const chartElement = document.getElementById('price-chart-container');
      if (!chartElement) return;

      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `grafik-harga-${productName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Berhasil",
        description: "Grafik berhasil diunduh sebagai PNG",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat mengunduh grafik",
        variant: "destructive",
      });
    }
  };

  const downloadAsCSV = () => {
    try {
      const headers = ['Tanggal', ...markets];
      const csvRows = [headers.join(',')];

      chartData.forEach(row => {
        const values = [
          row.date,
          ...markets.map(market => row[market] || 0)
        ];
        csvRows.push(values.join(','));
      });

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      link.href = URL.createObjectURL(blob);
      link.download = `data-harga-${productName.toLowerCase().replace(/\s+/g, '-')}.csv`;
      link.click();

      toast({
        title: "Berhasil",
        description: "Data berhasil diunduh sebagai CSV",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat mengunduh data",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = async () => {
    try {
      const chartElement = document.getElementById('price-chart-container');
      if (!chartElement) return;

      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 280;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const position = (pageHeight - imgHeight) / 2;

      pdf.setFontSize(16);
      pdf.text(`Grafik Harga - ${productName}`, 20, 20);
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      pdf.save(`grafik-harga-${productName.toLowerCase().replace(/\s+/g, '-')}.pdf`);

      toast({
        title: "Berhasil", 
        description: "Grafik berhasil diunduh sebagai PDF",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat mengunduh PDF",
        variant: "destructive",
      });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[600px] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Grafik Harga - {productName}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={downloadAsPNG}>
                    <FileImage className="w-4 h-4 mr-2" />
                    Unduh sebagai PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadAsCSV}>
                    <FileText className="w-4 h-4 mr-2" />
                    Unduh sebagai CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadAsPDF}>
                    <FileBarChart className="w-4 h-4 mr-2" />
                    Unduh sebagai PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-4 flex-1">
          <div className="mb-4">
            <h3 className="text-base font-medium text-foreground">
              {productName} (Konsumsi)
            </h3>
          </div>
          
          <div id="price-chart-container" className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {markets.map((market, index) => (
                  <Line
                    key={market}
                    type="monotone"
                    dataKey={market}
                    stroke={marketColors[index % marketColors.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6">
            <div className="flex flex-wrap gap-6">
              {markets.map((market, index) => (
                <div key={market} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: marketColors[index % marketColors.length] }}
                  />
                  <span className="text-sm text-muted-foreground">{market}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceChartModal;