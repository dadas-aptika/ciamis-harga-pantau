import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

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
          <div className="h-8 w-full">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData.map((value, index) => ({ value, index }))}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={changePercent > 0 ? "#ef4444" : changePercent < 0 ? "#22c55e" : "#3b82f6"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { value: 40, index: 0 },
                  { value: 65, index: 1 },
                  { value: 45, index: 2 },
                  { value: 80, index: 3 },
                  { value: 55, index: 4 },
                  { value: 75, index: 5 },
                  { value: 60, index: 6 }
                ]}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={changePercent > 0 ? "#ef4444" : changePercent < 0 ? "#22c55e" : "#3b82f6"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;