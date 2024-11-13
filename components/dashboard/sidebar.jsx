"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  DoorOpen,
  Calendar,
  Star,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Logo = () => (
  <div className="flex items-center gap-2 px-2">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
      <Zap className="h-5 w-5 text-primary-foreground" />
    </div>
    <div className="flex flex-col">
      <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-lg font-bold tracking-tight text-transparent">
        Talent Tune
      </span>
      <span className="text-xs text-muted-foreground">Management Platform</span>
    </div>
  </div>
);

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Assessments",
    href: "/dashboard/assessments",
    icon: ClipboardCheck,
  },
  {
    title: "Rooms",
    href: "/dashboard/rooms",
    icon: DoorOpen,
    count: 0,
  },
  {
    title: "My Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
    count: 0,
  },
  {
    title: "Penilaian",
    href: "/dashboard/penilaian",
    icon: Star,
  },
];

const UserInfo = () => (
  <div className="flex items-center gap-3 border-t px-4 py-3">
    <Avatar>
      <AvatarImage src="/avatars/01.png" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <span className="text-sm font-medium">John Doe</span>
      <span className="text-xs text-muted-foreground">Senior Developer</span>
    </div>
  </div>
);

const SidebarContent = ({ pathname, onMenuClick, menuItemCounts }) => (
  <div className="flex h-full flex-col">
    <div className="flex-1 py-2">
      <nav className="grid gap-1 px-5">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.href}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={cn(
                "text-muted-foreground group flex items-center rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
              onClick={onMenuClick}
            >
              <item.icon
                className={cn(
                  "mr-3 h-4 w-4 text-muted-foreground",
                  pathname === item.href ? "text-accent-foreground" : ""
                )}
              />
              <div className="flex w-full items-center justify-between">
                <span>{item.title}</span>
                {item.count !== undefined &&
                  (menuItemCounts?.[item.title] || 0) > 0 && (
                    <Badge
                      variant="default"
                      className="ml-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
                      style={{ backgroundColor: "#f6633b" }}
                    >
                      {menuItemCounts?.[item.title] || item.count}
                    </Badge>
                  )}
              </div>
            </Link>
          </motion.div>
        ))}
      </nav>
    </div>
    <UserInfo />
  </div>
);

export function Sidebar({
  open,
  onClose,
  menuItemCounts = {
    Rooms: 0,
    "My Schedule": 3,
  },
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="z-[100] w-[240px] p-0">
          <SheetHeader className="px-4 py-2">
            <SheetTitle className="text-left">Navigation</SheetTitle>
            <Logo />
          </SheetHeader>
          <SidebarContent
            pathname={pathname}
            onMenuClick={onClose}
            menuItemCounts={menuItemCounts}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r bg-background md:block"
      >
        <div className="flex h-full flex-col space-y-3">
          <div className="px-4 py-2">
            <Logo />
          </div>
          <SidebarContent
            pathname={pathname}
            onMenuClick={() => {}}
            menuItemCounts={menuItemCounts}
          />
        </div>
      </motion.div>
    </>
  );
}
