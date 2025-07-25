import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  unit: string;
  changePercent: number;
  changeAmount: number;
  image?: string;
  trendData?: number[];
}

const ProductCard = ({
  name,
  price,
  unit,
  changePercent,
  changeAmount,
  image,
  trendData = []
}: ProductCardProps) => {
  const getTrendColor = () => {
    if (changePercent > 0) return "text-destructive";
    if (changePercent < 0) return "text-success";
    return "text-primary";
  };

  const getTrendIcon = () => {
    if (changePercent > 0) return <TrendingUp className="w-3 h-3" />;
    if (changePercent < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendBg = () => {
    if (changePercent > 0) return "bg-red-50";
    if (changePercent < 0) return "bg-green-50";
    return "bg-blue-50";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatChange = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(Math.abs(amount));
  };

  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">📦</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm leading-tight text-foreground">
                {name}
              </h3>
              <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
            </div>
            
            <div className="text-lg font-semibold text-foreground mb-1">
              Rp {formatPrice(price)} / {unit}
            </div>
            
            <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">
                {Math.abs(changePercent).toFixed(2)}% (Rp {formatChange(changeAmount)})
              </span>
            </div>
          </div>
        </div>
        
        <div className={`mt-3 p-2 rounded ${getTrendBg()}`}>
          <div className="h-8 flex items-end gap-1">
            {trendData.slice(0, 10).map((value, index) => (
              <div
                key={index}
                className={`flex-1 rounded-sm ${
                  changePercent > 0 
                    ? "bg-red-300" 
                    : changePercent < 0 
                    ? "bg-green-300" 
                    : "bg-blue-300"
                }`}
                style={{ 
                  height: `${Math.max(10, (value / Math.max(...trendData)) * 100)}%` 
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;