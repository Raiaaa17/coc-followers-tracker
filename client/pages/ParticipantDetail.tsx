import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Activity,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { mockParticipants, formatNumber } from "@/lib/tracker-data";

export default function ParticipantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const participant = mockParticipants.find((p) => p.id === id);

  if (!participant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Participant not found</h2>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="h-9 w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  InstaTracker
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src={participant.profilePicture}
              alt={participant.displayName}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">
                  {participant.displayName}
                </h2>
                {participant.verified && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                @{participant.username}
              </p>

              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatNumber(participant.followers)}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatNumber(participant.posts)}
                  </div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <Badge
                    variant="secondary"
                    className={`${
                      participant.change24h >= 0
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {participant.change24h >= 0 ? "+" : ""}
                    {participant.change24h.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart Placeholder */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Follower Growth</h3>
            <div className="flex gap-2">
              {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                <Button
                  key={period}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Interactive chart will be implemented here</p>
              <p className="text-sm">
                Lightweight Charts integration coming soon
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Engagement</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Likes</span>
                <span className="font-medium">2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Comments</span>
                <span className="font-medium">45.2K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Engagement Rate</span>
                <span className="font-medium text-success">3.8%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Growth</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-medium text-success">+2.1M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Best Day</span>
                <span className="font-medium">+84.5K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Growth Rate</span>
                <span className="font-medium text-success">+0.8%/day</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Milestones</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">500M Followers</span>
                <Badge
                  variant="outline"
                  className="text-success border-success/30"
                >
                  Achieved
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">600M Followers</span>
                <Badge variant="outline">Target</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">95.2%</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
