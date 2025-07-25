import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: "all", label: "Semua" },
  { id: "beras", label: "Beras, Tepung, Minyak" },
  { id: "buah", label: "Buah" },
  { id: "bumbu-dasar", label: "Bumbu Dasar" },
  { id: "bumbu-masak", label: "Bumbu Masak" },
  { id: "daging", label: "Daging" },
  { id: "ikan", label: "Ikan" },
  { id: "makanan-instan", label: "Makanan Instan" },
  { id: "protein", label: "Protein" },
  { id: "sayur", label: "Sayur" },
  { id: "tidak-dikat", label: "Tidak dikat" }
];

const CategoryTabs = ({ selectedCategory, setSelectedCategory }: CategoryTabsProps) => {
  return (
    <div className="bg-white py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium mr-4">Kategori</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`text-xs px-3 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-accent"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;