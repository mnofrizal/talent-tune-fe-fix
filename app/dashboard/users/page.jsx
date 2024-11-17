"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth"; // Importing the useAuth hook
import { UsersHeader } from "@/components/users/users-header";
import { UsersTable } from "@/components/users/users-table";
import { UsersFilters } from "@/components/users/users-filters";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "@/config/api";

export default function UsersPage() {
  const { session } = useAuth(); // Accessing session from useAuth
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.LIST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <UsersHeader
        isDialogOpen={isAddUserDialogOpen}
        setIsDialogOpen={setIsAddUserDialogOpen}
      />
      <UsersFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <UsersTable
        users={users}
        search={search}
        roleFilter={roleFilter}
        refreshUsers={fetchUsers}
      />
      <AddUserDialog
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onUserAdded={fetchUsers} // Passing the callback to AddUserDialog
      />
    </motion.div>
  );
}
