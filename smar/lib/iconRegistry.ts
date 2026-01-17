import {
  Award,
  CheckCircle,
  Globe,
  Shield,
  Star,
  Rocket,
  Zap,
  Target,
  Users,
  Briefcase,
  User,
  Smartphone,
  MessageSquare,
  Box,
  Layout,
  Mail,
  MapPin,
  TrendingUp,
  Cpu
} from "lucide-react";

export const ICON_REGISTRY = {
  award: Award,
  check: CheckCircle,
  globe: Globe,
  shield: Shield,
  star: Star,
  rocket: Rocket,
  zap: Zap,
  target: Target,
  users: Users,
  briefcase: Briefcase,
  user: User,
  smartphone: Smartphone,
  message: MessageSquare,
  box: Box,
  layout: Layout,
  mail: Mail,
  mapPin: MapPin,
  trending: TrendingUp,
  cpu: Cpu
};

export type IconName = keyof typeof ICON_REGISTRY;