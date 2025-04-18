import {
  Users,
  DollarSign,
  MessageSquare,
  Trophy,
  CreditCard,
  Repeat,
  PhoneCall,
  Star,
  Percent,
  Video,
  PhoneOutgoing,
  Hourglass,
  Mail,
  View,
  Clock,
  ThumbsUp, ThumbsDown,
} from "lucide-react";

import {
  generatePointsData,
  generateSubscriptionTimeData,
} from "./extendedData";

export const metrics = [
  {
    name: "Points Earned",
    value: generatePointsData().earned.toLocaleString(),
    change: "+15.2%",
    trend: "up",
    icon: Star,
  },
  {
    name: "Points Purchased",
    value: generatePointsData().purchased.toLocaleString(),
    change: "+10.5%",
    trend: "up",
    icon: CreditCard,
  },
  {
    name: "Points Withdrawn",
    value: generatePointsData().withdrawn.toLocaleString(),
    change: "-5.8%",
    trend: "down",
    icon: DollarSign,
  },
  {
    name: "Avg Subscription Time",
    value: generateSubscriptionTimeData() + " days",
    change: "+8.3%",
    trend: "up",
    icon: Repeat,
  },
  {
    name: "Total Users",
    value: "1,234",
    change: "+12.3%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Monthly Revenue",
    value: "$45,678",
    change: "+8.7%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Active Subscriptions",
    value: "892",
    change: "+5.2%",
    trend: "up",
    icon: Repeat,
  },
  {
    name: "Renewal Rate",
    value: "85%",
    change: "+2.5%",
    trend: "up",
    icon: Percent,
  },
  {
    name: "Total Calls",
    value: "1,567",
    change: "+10.3%",
    trend: "up",
    icon: PhoneCall,
  },
  {
    name: "Messages Sent",
    value: "12,892",
    change: "+15.8%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    name: "Active Contests",
    value: "23",
    change: "+15.0%",
    trend: "up",
    icon: Trophy,
  },
  {
    name: "Contest Participants",
    value: "456",
    change: "+18.2%",
    trend: "up",
    icon: Star,
  },
  {
    name: "Payment Success Rate",
    value: "98.5%",
    change: "+0.5%",
    trend: "up",
    icon: CreditCard,
  },
];

export const callsAndMsg = [
  {
    name: "Total Calls",
    value: generatePointsData().purchased.toLocaleString(),
    change: "+10.3%",
    trend: "up",
    icon: PhoneCall,
  },
  {
    name: "Messages ",
    value: generatePointsData().purchased.toLocaleString(),
    change: "+15.8%",
    trend: "up",
    icon: Mail,
  },
  {
    name: "Audio Call",
    value: generatePointsData().earned.toLocaleString(),
    change: "+15.2%",
    trend: "up",
    icon: PhoneOutgoing,
  },
  {
    name: "Video Call",
    value: generatePointsData().earned.toLocaleString(),
    change: "+15.2%",
    trend: "up",
    icon: Video,
  },
  {
    name: "Traffic Hours",
    value: '1,1649',
    change: "+10.5%",
    trend: "up",
    icon: Hourglass,
  },

];

export const FaqsData = [
  {
    name: "Total Views",
    value: 1320,
    change: "+70.3%",
    trend: "up",
    icon: <View color="#801ce3" />,
  },
  {
    name: "Avg Time",
    value: '09:12',
    change: "+55.8%",
    trend: "up",
    icon: <Clock color="#801ce3" />,
  },
  {
    name: "Likes",
    value: 205,
    change: "+75.2%",
    trend: "up",
    icon: <ThumbsUp color="#801ce3" />,
  },
  {
    name: "Dislikes",
    value: '132',
    change: "+15.2%",
    trend: "up",
    icon: <ThumbsDown color="#801ce3" /> ,
  },

];

