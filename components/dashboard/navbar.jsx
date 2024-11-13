"use client";

import * as React from "react";
import { Bell, Menu, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/dashboard/user-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";

const getPathSegments = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: "/" + segments.slice(0, index + 1).join("/"),
    current: index === segments.length - 1,
  }));
};

export function Navbar({ onMenuClick }) {
  const pathname = usePathname();
  const segments = getPathSegments(pathname);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="ml-4 flex-1">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            {segments.map((segment, index) => (
              <React.Fragment key={segment.href}>
                <ChevronRight className="h-4 w-4" />
                {segment.current ? (
                  <span className="font-medium text-foreground">
                    {segment.name}
                  </span>
                ) : (
                  <Link
                    href={segment.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {segment.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 px-4 md:block">
          <Button
            variant="outline"
            className="w-full justify-start text-sm text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogTitle className="sr-only">Search</DialogTitle>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Dashboard</CommandItem>
              <CommandItem>Users</CommandItem>
              <CommandItem>Settings</CommandItem>
              <CommandItem>Analytics</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <div className="flex items-center justify-end space-x-2 md:space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
