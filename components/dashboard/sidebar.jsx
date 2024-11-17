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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth"; // Importing useAuth hook

const Logo = () => (
  <div className="flex items-center gap-2 px-2 pt-4">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e56c48]">
      <Zap className="h-5 w-5 text-primary-foreground" />
    </div>
    <div className="flex flex-col">
      <span className="bg-gradient-to-r from-[#102c8e] to-[#102c8e]/60 bg-clip-text text-lg font-bold tracking-tight text-transparent">
        Talent Tune
      </span>
      <span className="text-xs text-muted-foreground">Management Platform</span>
    </div>
  </div>
);

const adminMenuItems = [
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
];

const userMenuItems = [
  {
    title: "My Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
    count: 0,
  },
  {
    title: "Rooms",
    href: "/dashboard/rooms",
    icon: DoorOpen,
    count: 0,
  },
  {
    title: "Penilaian",
    href: "/dashboard/penilaian",
    icon: Star,
  },
];

const UserInfo = (
  { name, role } // Accepting name and role as props
) => (
  <div className="flex items-center gap-4 border-t bg-gray-50/50 px-6 py-4">
    <Avatar className="h-10 w-10 ring-2 ring-white">
      <AvatarImage src="/avatars/01.png" alt={name} />
      <AvatarFallback>{name ? name.charAt(0) : "JD"}</AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <span className="font-inter text-sm font-semibold tracking-tight text-gray-900">
        {name}
      </span>
      <span className="text-xs font-medium text-gray-500">{role}</span>
    </div>
  </div>
);

const MenuSection = ({
  title,
  items,
  pathname,
  onMenuClick,
  menuItemCounts,
}) => (
  <div className="space-y-3">
    <h3 className="px-6 text-sm text-gray-500">{title}</h3>
    <nav className="grid gap-3 px-6">
      {items.map((item) => (
        <motion.div
          key={item.href}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={item.href}
            className={cn(
              "text-muted-foreground group relative flex items-center rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#eef2fe] hover:text-[#102c8e]",
              pathname === item.href
                ? "bg-[#eef2fe] text-[#102c8e] font-semibold"
                : "transparent"
            )}
            onClick={onMenuClick}
          >
            {pathname === item.href && (
              <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-sm bg-[#102c8e]" />
            )}
            <item.icon
              className={cn(
                "mr-3 h-5 w-5 text-muted-foreground",
                pathname === item.href ? "text-[#102c8e]" : ""
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
);

const SidebarContent = ({ pathname, onMenuClick, menuItemCounts, user }) => (
  <div className="flex h-full flex-col">
    <div className="flex-1 space-y-6 py-2">
      <MenuSection
        title=""
        items={adminMenuItems}
        pathname={pathname}
        onMenuClick={onMenuClick}
        menuItemCounts={menuItemCounts}
      />
      <MenuSection
        title="User"
        items={userMenuItems}
        pathname={pathname}
        onMenuClick={onMenuClick}
        menuItemCounts={menuItemCounts}
      />
    </div>
    <UserInfo name={user?.name || "Guest"} role={user?.systemRole || "User"} />{" "}
    {/* Using dynamic name and role */}
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
  const { user } = useAuth(); // Using useAuth to get user data

  return (
    <>
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
            user={user} // Passing user data to SidebarContent
          />
        </SheetContent>
      </Sheet>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r bg-[#fbfbfd] md:block"
      >
        <div className="flex h-full flex-col space-y-3">
          <div className="px-4 py-2">
            <Logo />
          </div>
          <SidebarContent
            pathname={pathname}
            onMenuClick={() => {}}
            menuItemCounts={menuItemCounts}
            user={user} // Passing user data to SidebarContent
          />
        </div>
      </motion.div>
    </>
  );
}
