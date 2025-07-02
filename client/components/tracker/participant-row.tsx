import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import {
  Participant,
  formatNumber,
  formatPercentage,
} from "@/lib/tracker-data";
import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

interface ParticipantRowProps {
  participant: Participant;
  onClick: (participant: Participant) => void;
}

export function ParticipantRow({ participant, onClick }: ParticipantRowProps) {
  const {
    rank,
    username,
    displayName,
    profilePicture,
    followers,
    change24h,
    change7d,
    posts,
    verified,
    sparklineData,
  } = participant;

  return (
    <tr
      className="group border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => onClick(participant)}
    >
      <td className="p-3 text-sm font-medium text-muted-foreground">{rank}</td>

      <td className="p-3">
        <div className="flex items-center gap-3">
          <img
            src={profilePicture}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{displayName}</span>
              {verified && <CheckCircle className="w-4 h-4 text-primary" />}
            </div>
            <span className="text-sm text-muted-foreground">@{username}</span>
          </div>
        </div>
      </td>

      <td className="p-3 text-sm font-medium">{formatNumber(followers)}</td>

      <td className="p-3">
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            change24h >= 0
              ? "bg-success/10 text-success border-success/20"
              : "bg-destructive/10 text-destructive border-destructive/20",
          )}
        >
          {formatPercentage(change24h)}
        </Badge>
      </td>

      <td className="p-3">
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            change7d >= 0
              ? "bg-success/10 text-success border-success/20"
              : "bg-destructive/10 text-destructive border-destructive/20",
          )}
        >
          {formatPercentage(change7d)}
        </Badge>
      </td>

      <td className="p-3 text-sm text-muted-foreground">
        {formatNumber(posts)}
      </td>

      <td className="p-3">
        <div className="flex items-center justify-center">
          <Sparkline data={sparklineData} trend={change24h} />
        </div>
      </td>
    </tr>
  );
}
