"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast"; // Updated import for toast
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { API_ENDPOINTS } from "@/config/api";

export function UsersTable({ users, search, roleFilter, refreshUsers }) {
  const { session } = useAuth(); // Accessing session from useAuth
  const { toast } = useToast(); // Initialize toast
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || user.systemRole === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId) => {
    console.log({ userId });
    try {
      const response = await fetch(`${API_ENDPOINTS.USERS.LIST}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
        },
      });

      if (response.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: "User deleted successfully",
          duration: 3000,
        });
        refreshUsers(); // Call the refresh function to update the user list
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to delete user",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete user",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-md border"
    >
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Bidang</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.nip}</TableCell>
                  <TableCell>{user.systemRole}</TableCell>
                  <TableCell>{user.jabatan}</TableCell>
                  <TableCell>{user.bidang}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onSelect={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
