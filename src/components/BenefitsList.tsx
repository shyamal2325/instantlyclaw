import React from 'react';
import { Cloud, Users, Sparkles, Briefcase, Check } from 'lucide-react';

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const benefits: BenefitItem[] = [
  {
    id: 'cloud-deploy',
    title: 'One-Click Cloud Deployment',
    description: 'No Docker, VPS, or Terminal Required.',
    icon: Cloud,
  },
  {
    id: 'agent-team',
    title: 'Pre-Built Multi-Agent Team',
    description: 'Includes CEO, Manager, and Specialized AI Agents.',
    icon: Users,
  },
  {
    id: 'ready-skills',
    title: '15 Ready-to-Use Skills',
    description: 'Automate research, content creation, reporting, and business tasks.',
    icon: Sparkles,
  },
  {
    id: 'commercial-rights',
    title: 'Commercial Rights Included',
    description: 'Explore offering AI-powered services to businesses.',
    icon: Briefcase,
  },
];

export const BenefitsList: React.FC = () => {
  return (
    <div className="space-y-3.5 my-6">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;
        return (
          <div
            key={benefit.id}
            className="flex items-start gap-3.5 group rounded-xl p-2.5 -mx-2.5 transition-colors hover:bg-slate-800/30"
          >
            <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-cyan-400/80 hidden sm:inline-block" />
                <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
                  {benefit.title}
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
