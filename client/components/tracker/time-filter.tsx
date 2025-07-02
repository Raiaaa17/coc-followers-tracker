import { Button } from "@/components/ui/button";
import { timeFilters, TimeFilter } from "@/lib/tracker-data";
import { cn } from "@/lib/utils";

interface TimeFilterProps {
  selected: TimeFilter["value"];
  onChange: (value: TimeFilter["value"]) => void;
}

export function TimeFilterSelector({ selected, onChange }: TimeFilterProps) {
  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
      {timeFilters.map((filter) => (
        <Button
          key={filter.value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(filter.value)}
          className={cn(
            "h-8 px-3 text-sm transition-all",
            selected === filter.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
