"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    nip: "123456",
    role: "ADMINISTRATOR",
    jabatan: "Senior Manager",
    bidang: "IT",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    nip: "654321",
    role: "USER",
    jabatan: "Team Lead",
    bidang: "HR",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    nip: "112233",
    role: "EVALUATOR",
    jabatan: "Senior Evaluator",
    bidang: "Assessment",
  },
];

export function UsersTable({ search, roleFilter }) {
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = search.toLowerCase() === "" || 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId) => {
    toast.success("User deleted successfully");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-md border"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.nip}</TableCell>
                <TableCell>{user.role}</TableCell>
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
    </motion.div>
  );
}