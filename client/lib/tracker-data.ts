export interface Participant {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  profilePicture: string;
  followers: number;
  change24h: number;
  change7d: number;
  posts: number;
  verified: boolean;
  sparklineData: number[];
}

export interface TimeFilter {
  label: string;
  value: "24h" | "7d" | "30d" | "all";
}

export const timeFilters: TimeFilter[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "All", value: "all" },
];

// Mock data generator
const generateSparklineData = (trend: number): number[] => {
  const data: number[] = [];
  let value = 100;

  for (let i = 0; i < 20; i++) {
    const variance = (Math.random() - 0.5) * 20;
    const trendInfluence = trend * 0.5;
    value += variance + trendInfluence;
    data.push(Math.max(0, value));
  }

  return data;
};

export const mockParticipants: Participant[] = [
  {
    id: "1",
    rank: 1,
    username: "cristiano",
    displayName: "Cristiano Ronaldo",
    profilePicture: "https://picsum.photos/40/40?random=1",
    followers: 632000000,
    change24h: 2.4,
    change7d: 8.7,
    posts: 3654,
    verified: true,
    sparklineData: generateSparklineData(2.4),
  },
  {
    id: "2",
    rank: 2,
    username: "kyliejenner",
    displayName: "Kylie Jenner",
    profilePicture: "https://picsum.photos/40/40?random=2",
    followers: 399000000,
    change24h: -0.8,
    change7d: 3.2,
    posts: 7246,
    verified: true,
    sparklineData: generateSparklineData(-0.8),
  },
  {
    id: "3",
    rank: 3,
    username: "leomessi",
    displayName: "Leo Messi",
    profilePicture: "https://picsum.photos/40/40?random=3",
    followers: 507000000,
    change24h: 5.2,
    change7d: 12.6,
    posts: 1089,
    verified: true,
    sparklineData: generateSparklineData(5.2),
  },
  {
    id: "4",
    rank: 4,
    username: "selenagomez",
    displayName: "Selena Gomez",
    profilePicture: "https://picsum.photos/40/40?random=4",
    followers: 429000000,
    change24h: 1.8,
    change7d: 6.4,
    posts: 2174,
    verified: true,
    sparklineData: generateSparklineData(1.8),
  },
  {
    id: "5",
    rank: 5,
    username: "kimkardashian",
    displayName: "Kim Kardashian",
    profilePicture: "https://picsum.photos/40/40?random=5",
    followers: 364000000,
    change24h: -1.2,
    change7d: 2.1,
    posts: 5982,
    verified: true,
    sparklineData: generateSparklineData(-1.2),
  },
  {
    id: "6",
    rank: 6,
    username: "arianagrande",
    displayName: "Ariana Grande",
    profilePicture: "https://picsum.photos/40/40?random=6",
    followers: 380000000,
    change24h: 3.7,
    change7d: 9.8,
    posts: 5127,
    verified: true,
    sparklineData: generateSparklineData(3.7),
  },
  {
    id: "7",
    rank: 7,
    username: "therock",
    displayName: "Dwayne Johnson",
    profilePicture: "https://picsum.photos/40/40?random=7",
    followers: 395000000,
    change24h: 4.1,
    change7d: 11.3,
    posts: 7894,
    verified: true,
    sparklineData: generateSparklineData(4.1),
  },
  {
    id: "8",
    rank: 8,
    username: "beyonce",
    displayName: "Beyoncé",
    profilePicture: "https://picsum.photos/40/40?random=8",
    followers: 319000000,
    change24h: 2.9,
    change7d: 7.5,
    posts: 2456,
    verified: true,
    sparklineData: generateSparklineData(2.9),
  },
  {
    id: "9",
    rank: 9,
    username: "khloekardashian",
    displayName: "Khloé Kardashian",
    profilePicture: "https://picsum.photos/40/40?random=9",
    followers: 311000000,
    change24h: -0.5,
    change7d: 1.8,
    posts: 4567,
    verified: true,
    sparklineData: generateSparklineData(-0.5),
  },
  {
    id: "10",
    rank: 10,
    username: "justinbieber",
    displayName: "Justin Bieber",
    profilePicture: "https://picsum.photos/40/40?random=10",
    followers: 293000000,
    change24h: 1.4,
    change7d: 4.2,
    posts: 6834,
    verified: true,
    sparklineData: generateSparklineData(1.4),
  },
];

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const formatPercentage = (num: number): string => {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
};
