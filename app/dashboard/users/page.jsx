"use client";
import { UsersHeader } from "@/components/users/users-header";
import { UsersTable } from "@/components/users/users-table";
import { UsersFilters } from "@/components/users/users-filters";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { motion } from "framer-motion";
import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <UsersHeader isDialogOpen={isAddUserDialogOpen} setIsDialogOpen={setIsAddUserDialogOpen} />
      <UsersFilters search={search} setSearch={setSearch} roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
      <UsersTable search={search} roleFilter={roleFilter} />
      <AddUserDialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen} />
    </motion.div>
  );
}