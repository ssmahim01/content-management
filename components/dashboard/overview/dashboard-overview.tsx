"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ImageIcon,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  BarChart3,
  Zap,
  TrendingUp,
  Settings,
  User,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getFromStorage, STORAGE_KEYS } from "@/lib/storage";

interface DashboardStats {
  totalBlogs: number;
  totalMedia: number;
  totalIdeas: number;
  totalMessages: number;
  totalHero: number;
  totalAbout: number;
  totalContact: number;
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalMedia: 0,
    totalIdeas: 0,
    totalMessages: 0,
    totalHero: 0,
    totalAbout: 0,
    totalContact: 0,
  });

  useEffect(() => {
    const blogs = getFromStorage(STORAGE_KEYS.BLOGS, []);
    const media = getFromStorage(STORAGE_KEYS.MEDIA, []);
    const ideas = getFromStorage(STORAGE_KEYS.IDEAS, []);
    const messages = getFromStorage(STORAGE_KEYS.CONTACT_MESSAGES, []);
    type SectionWithId = { id?: string | number };
    const hero = getFromStorage(STORAGE_KEYS.HERO, {}) as SectionWithId;
    const about = getFromStorage(STORAGE_KEYS.ABOUT, {}) as SectionWithId;
    const contact = getFromStorage(STORAGE_KEYS.CONTACT, {}) as SectionWithId;

    setTimeout(() => {
      setStats({
        totalBlogs: blogs.length || 0,
        totalMedia: media.length || 0,
        totalIdeas: ideas.length || 0,
        totalMessages: messages.length || 0,
        totalHero: hero?.id ? 1 : 0,
        totalAbout: about?.id ? 1 : 0,
        totalContact: contact?.id ? 1 : 0,
      });
    }, 100);
  }, []);

  const contentModules = [
    {
      icon: FileText,
      label: "Blog Posts",
      count: stats.totalBlogs,
      href: "/dashboard/blogs",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      description: "Write and manage articles",
    },
    {
      icon: ImageIcon,
      label: "Media Gallery",
      count: stats.totalMedia,
      href: "/dashboard/media",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      description: "Upload and organize images",
    },
    {
      icon: Lightbulb,
      label: "Ideas & Vision",
      count: stats.totalIdeas,
      href: "/dashboard/ideas",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      description: "Share your ideas",
    },
    {
      icon: User,
      label: "About Section",
      count: stats.totalAbout,
      href: "/dashboard/about",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      description: "Update your biography",
    },
    {
      icon: Zap,
      label: "Hero Section",
      count: stats.totalHero,
      href: "/dashboard/hero",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
      description: "Manage hero content",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      count: stats.totalMessages,
      href: "/dashboard/contact",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      description: "View inquiries",
    },
  ];

  const checklist = [
    { label: "Configure Hero Section", link: "/dashboard/hero", icon: Zap },
    {
      label: "Write Your First Blog",
      link: "/dashboard/blogs",
      icon: FileText,
    },
    {
      label: "Upload Portfolio Images",
      link: "/dashboard/media",
      icon: ImageIcon,
    },
    {
      label: "Add Your Ideas & Vision",
      link: "/dashboard/ideas",
      icon: Lightbulb,
    },
    { label: "Complete About Section", link: "/dashboard/about", icon: User },
    {
      label: "Set Contact Information",
      link: "/dashboard/contact",
      icon: MessageSquare,
    },
  ];

  const totalContent =
    stats.totalBlogs +
    stats.totalMedia +
    stats.totalIdeas +
    stats.totalMessages;

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-600 dark:from-indigo-900/50 dark:via-blue-900/50 dark:to-indigo-900/50 rounded-xl p-8 border border-indigo-300 dark:border-indigo-900/50 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white dark:text-slate-100 mb-3">
              Dashboard Overview
            </h1>
            <p className="text-indigo-100 dark:text-indigo-300 text-lg max-w-2xl">
              Manage all your portfolio content, from blog posts to media
              galleries. Keep your personal brand fresh and up-to-date with our
              comprehensive admin panel.
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-20 h-20 rounded-full bg-white/20 dark:bg-slate-900/30">
            <BarChart3 className="w-10 h-10 text-white dark:text-indigo-300" />
          </div>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-indigo-200 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Total Content
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {totalContent}
              </p>
            </div>
            <Eye className="w-8 h-8 text-indigo-600 dark:text-indigo-400 opacity-20" />
          </div>
        </Card>
        <Card className="p-6 border-indigo-200 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Blog Posts
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {stats.totalBlogs}
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-20" />
          </div>
        </Card>
        <Card className="p-6 border-indigo-200 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Media Items
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {stats.totalMedia}
              </p>
            </div>
            <ImageIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-20" />
          </div>
        </Card>
        <Card className="p-6 border-indigo-200 dark:border-indigo-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Messages
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {stats.totalMessages}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Content Management Modules */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Content Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contentModules.map(
            ({
              icon: Icon,
              label,
              count,
              href,
              color,
              bgColor,
              description,
            }) => (
              <Link key={href} href={href}>
                <Card className="p-6 border-indigo-200 dark:border-indigo-900/30 hover:border-indigo-400 dark:hover:border-indigo-700 hover:shadow-lg transition-all cursor-pointer h-full hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {count}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {label}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Card>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Setup & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Setup Checklist */}
        <Card className="lg:col-span-2 p-6 border-indigo-200 dark:border-indigo-900/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Setup Checklist
          </h2>
          <div className="space-y-2">
            {checklist.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} href={item.link}>
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                        <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Best Practices */}
        <Card className="p-6 border-indigo-200 dark:border-indigo-900/30 bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Best Practices
          </h2>
          <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-400 text-white dark:text-slate-900 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Keep hero and about sections updated regularly</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-400 text-white dark:text-slate-900 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Publish weekly blog posts for better SEO</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-400 text-white dark:text-slate-900 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Use bilingual content for broader audience</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-400 text-white dark:text-slate-900 text-xs flex items-center justify-center font-bold">
                4
              </span>
              <span>Respond to messages promptly</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Additional Resources */}
      <Card className="p-6 border-indigo-200 dark:border-indigo-900/30 bg-slate-50 dark:bg-slate-900/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Dashboard Settings
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Configure your admin preferences and account information
            </p>
          </div>
          <Link href="/dashboard/settings">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
