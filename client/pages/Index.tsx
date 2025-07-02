import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Activity, ChevronUp, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TimeFilterSelector } from "@/components/tracker/time-filter";
import { ParticipantRow } from "@/components/tracker/participant-row";
import { mockParticipants, Participant, TimeFilter } from "@/lib/tracker-data";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeFilter, setSelectedTimeFilter] =
    useState<TimeFilter["value"]>("24h");
  const [sortField, setSortField] = useState<keyof Participant | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [lastUpdated] = useState(new Date());

  const sortedAndFilteredParticipants = useMemo(() => {
    let filtered = mockParticipants;

    if (searchQuery) {
      filtered = mockParticipants.filter(
        (participant) =>
          participant.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          participant.displayName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return filtered;
  }, [searchQuery, sortField, sortDirection]);

  const handleSort = (field: keyof Participant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortableHeader = ({
    field,
    children,
    className = "",
  }: {
    field: keyof Participant;
    children: React.ReactNode;
    className?: string;
  }) => (
    <th
      className={`p-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field &&
          (sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>
    </th>
  );

  const handleParticipantClick = (participant: Participant) => {
    navigate(`/participant/${participant.id}`);
  };

  const SortableHeader = ({
    field,
    children,
    className = "",
  }: {
    field: keyof Participant;
    children: React.ReactNode;
    className?: string;
  }) => (
    <th
      className={`p-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field &&
          (sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>
    </th>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                InstaTracker
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <TimeFilterSelector
                selected={selectedTimeFilter}
                onChange={setSelectedTimeFilter}
              />
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search participants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Card className="overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <SortableHeader field="rank">#</SortableHeader>
                  <SortableHeader field="displayName">
                    Participant
                  </SortableHeader>
                  <SortableHeader field="followers">Followers</SortableHeader>
                  <SortableHeader field="change24h">24h ∆</SortableHeader>
                  <SortableHeader field="change7d">7d ∆</SortableHeader>
                  <SortableHeader field="posts">Posts</SortableHeader>
                  <th className="p-3 text-center text-sm font-medium text-muted-foreground">
                    Chart
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredParticipants.map((participant) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    onClick={handleParticipantClick}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 p-4">
            {sortedAndFilteredParticipants.map((participant) => (
              <Card
                key={participant.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleParticipantClick(participant)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{participant.rank}
                    </span>
                    <img
                      src={participant.profilePicture}
                      alt={participant.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {participant.displayName}
                        </span>
                        {participant.verified && (
                          <Activity className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        @{participant.username}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Followers</span>
                    <div className="font-medium">
                      {(participant.followers / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">24h Change</span>
                    <div
                      className={`font-medium ${
                        participant.change24h >= 0
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {participant.change24h >= 0 ? "+" : ""}
                      {participant.change24h.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-6 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <span className="text-sm text-muted-foreground">
            Data are updated every 12 hours
          </span>
        </footer>
      </main>
    </div>
  );
}
