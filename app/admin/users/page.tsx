"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Shield,
  Building2,
  Star,
  Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: "talent" | "business" | "admin";
  status: "active" | "inactive" | "pending";
  avatar_url?: string;
  company_name?: string;
  location?: string;
  created_at: string;
  last_login?: string;
}

export default function AdminUsersPage() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "talent" | "business" | "admin"
  >("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive" | "pending"
  >("all");

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "admin@krystal.com",
      full_name: "Admin User",
      user_type: "admin",
      status: "active",
      avatar_url: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      created_at: "2024-01-01T00:00:00Z",
      last_login: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      email: "business@example.com",
      full_name: "Sarah Johnson",
      user_type: "business",
      status: "active",
      avatar_url: "/placeholder.svg?height=40&width=40",
      company_name: "Creative Studios Inc",
      location: "Los Angeles, CA",
      created_at: "2024-01-02T00:00:00Z",
      last_login: "2024-01-15T09:15:00Z",
    },
    {
      id: "3",
      email: "marketing@brandco.com",
      full_name: "Michael Chen",
      user_type: "business",
      status: "active",
      avatar_url: "/placeholder.svg?height=40&width=40",
      company_name: "BrandCo Marketing",
      location: "New York, NY",
      created_at: "2024-01-03T00:00:00Z",
      last_login: "2024-01-14T16:45:00Z",
    },
    {
      id: "4",
      email: "talent@example.com",
      full_name: "Emma Rodriguez",
      user_type: "talent",
      status: "active",
      avatar_url: "/placeholder.svg?height=40&width=40",
      location: "Miami, FL",
      created_at: "2024-01-04T00:00:00Z",
      last_login: "2024-01-15T11:20:00Z",
    },
    {
      id: "5",
      email: "actor@example.com",
      full_name: "James Wilson",
      user_type: "talent",
      status: "active",
      avatar_url: "/placeholder.svg?height=40&width=40",
      location: "Atlanta, GA",
      created_at: "2024-01-05T00:00:00Z",
      last_login: "2024-01-13T14:30:00Z",
    },
    {
      id: "6",
      email: "influencer@example.com",
      full_name: "Sophia Kim",
      user_type: "talent",
      status: "pending",
      avatar_url: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
      created_at: "2024-01-06T00:00:00Z",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company_name &&
        user.company_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "all" || user.user_type === filterType;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "inactive"
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    showToast(
      `User ${
        newStatus === "active" ? "activated" : "deactivated"
      } successfully`,
      "success"
    );
  };

  const handleSendEmail = (userEmail: string) => {
    showToast(`Email sent to ${userEmail}`, "success");
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "business":
        return <Building2 className="h-4 w-4" />;
      case "talent":
        return <Star className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage all users across the KRYSTAL platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.user_type === "admin").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.user_type === "business").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Businesses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.user_type === "talent").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Talent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Search and filter users by type, status, or name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Filter className="h-4 w-4" />
                    Type: {filterType === "all" ? "All" : filterType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType("all")}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("admin")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("business")}>
                    Business
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("talent")}>
                    Talent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Filter className="h-4 w-4" />
                    Status: {filterStatus === "all" ? "All" : filterStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Users Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatar_url || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {user.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.full_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                            {user.company_name && (
                              <p className="text-xs text-muted-foreground">
                                {user.company_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getUserTypeIcon(user.user_type)}
                          <span className="capitalize">{user.user_type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.location || "—"}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.last_login
                          ? new Date(user.last_login).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "inactive")
                                }
                                className="text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "active")
                                }
                                className="text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleSendEmail(user.email)}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No users found matching your criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
