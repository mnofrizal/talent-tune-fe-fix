"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export function UsersFilters({ search, setSearch, roleFilter, setRoleFilter }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex gap-2">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="EVALUATOR">Evaluator</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}