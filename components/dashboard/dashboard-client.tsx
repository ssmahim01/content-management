"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  FileText,
  ImageIcon,
  Lightbulb,
  Mail,
  ArrowRight,
  BarChart3,
} from "lucide-react";

const stats = {
  blogs: 10,
  media: 5,
  ideas: 8,
  messages: 3,
};

const user = {
  name: "John Doe",
};

export default function DashboardClient() {
  const quickActions = [
    {
      title: "Blogs",
      description: "Manage blog posts",
      icon: FileText,
      href: "/dashboard/blogs",
      count: stats.blogs,
      color: "text-blue-500",
    },
    {
      title: "Media",
      description: "Manage gallery",
      icon: ImageIcon,
      href: "/dashboard/media",
      count: stats.media,
      color: "text-purple-500",
    },
    {
      title: "Ideas",
      description: "Manage ideas",
      icon: Lightbulb,
      href: "/dashboard/ideas",
      count: stats.ideas,
      color: "text-yellow-500",
    },
    {
      title: "Messages",
      description: "View inquiries",
      icon: Mail,
      href: "/dashboard/messages",
      count: stats.messages,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          {user?.name}, manage your portfolio content from here
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.href}
              className="p-6 hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <Link href={action.href} className="block h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-secondary/50 ${action.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {action.count}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {action.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Getting Started
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete these steps to set up your portfolio
            </p>
          </div>
          <BarChart3 className="w-6 h-6 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {[
            { title: "Update Hero Section", href: "/dashboard/hero" },
            { title: "Add Blog Posts", href: "/dashboard/blogs" },
            { title: "Upload Media", href: "/dashboard/media" },
            { title: "Configure About Section", href: "/dashboard/about" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <span className="text-foreground">{item.title}</span>
              </div>
              <Link href={item.href}>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
