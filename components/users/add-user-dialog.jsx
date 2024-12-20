"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Updated import for toast
import { API_ENDPOINTS } from "@/config/api"; // Importing API endpoints
import { useAuth } from "@/hooks/use-auth"; // Importing useAuth to access session

export function AddUserDialog({ open, onOpenChange, onUserAdded }) {
  // Added onUserAdded prop
  const { toast } = useToast();
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    nip: "",
    role: "",
    jabatan: "",
    bidang: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.USERS.LIST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          variant: "default",
          title: "Success",
          description: "User added successfully",
          duration: 3000,
        });
        onUserAdded(); // Call the callback to refresh the user list
        onOpenChange(false);
        setNewUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          nip: "",
          role: "",
          jabatan: "",
          bidang: "",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to add user",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with specific details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newUser.name}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              value={newUser.email}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              className="col-span-3"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              value={newUser.password}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nip" className="text-right">
              NIP
            </Label>
            <Input
              id="nip"
              className="col-span-3"
              value={newUser.nip}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, nip: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={newUser.role}
              onValueChange={(value) =>
                setNewUser((prev) => ({ ...prev, role: value }))
              }
              required
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="EVALUATOR">Evaluator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jabatan" className="text-right">
              Jabatan
            </Label>
            <Input
              id="jabatan"
              className="col-span-3"
              value={newUser.jabatan}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, jabatan: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bidang" className="text-right">
              Bidang
            </Label>
            <Input
              id="bidang"
              className="col-span-3"
              value={newUser.bidang}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, bidang: e.target.value }))
              }
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
