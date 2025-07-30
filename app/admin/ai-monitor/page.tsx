"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  Brain,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingUp,
  Database,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface AIJob {
  id: string;
  type: "embedding" | "matching" | "processing";
  status: "pending" | "running" | "completed" | "failed";
  user_id: string;
  user_name: string;
  user_type: "talent" | "business";
  created_at: string;
  completed_at?: string;
  processing_time?: number;
  error_message?: string;
  details: string;
}

export default function AIMonitorPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock AI jobs data
  const mockJobs: AIJob[] = [
    {
      id: "job-001",
      type: "embedding",
      status: "completed",
      user_id: "user-1",
      user_name: "Emma Rodriguez",
      user_type: "talent",
      created_at: "2024-01-15T10:30:00Z",
      completed_at: "2024-01-15T10:30:15Z",
      processing_time: 15000,
      details: "Generated embeddings for 5 portfolio images",
    },
    {
      id: "job-002",
      type: "matching",
      status: "running",
      user_id: "user-2",
      user_name: "Sarah Johnson",
      user_type: "business",
      created_at: "2024-01-15T10:32:00Z",
      details: "Finding talent matches for Fashion Campaign Project",
    },
    {
      id: "job-003",
      type: "processing",
      status: "completed",
      user_id: "user-3",
      user_name: "James Wilson",
      user_type: "talent",
      created_at: "2024-01-15T10:25:00Z",
      completed_at: "2024-01-15T10:25:45Z",
      processing_time: 45000,
      details: "Processed video portfolio - extracted 12 keyframes",
    },
    {
      id: "job-004",
      type: "embedding",
      status: "failed",
      user_id: "user-4",
      user_name: "Michael Chen",
      user_type: "business",
      created_at: "2024-01-15T10:20:00Z",
      completed_at: "2024-01-15T10:20:30Z",
      processing_time: 30000,
      error_message: "Image format not supported",
      details: "Failed to process project reference images",
    },
    {
      id: "job-005",
      type: "matching",
      status: "pending",
      user_id: "user-5",
      user_name: "Creative Studios Inc",
      user_type: "business",
      created_at: "2024-01-15T10:35:00Z",
      details: "Queued: Brand Ambassador Campaign matching",
    },
  ];

  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  const refreshJobs = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update some job statuses for demo
    const updatedJobs = jobs.map((job) => {
      if (job.status === "running" && Math.random() > 0.5) {
        return {
          ...job,
          status: "completed" as const,
          completed_at: new Date().toISOString(),
          processing_time: Math.floor(Math.random() * 60000) + 10000,
        };
      }
      if (job.status === "pending" && Math.random() > 0.7) {
        return {
          ...job,
          status: "running" as const,
        };
      }
      return job;
    });

    setJobs(updatedJobs);
    setIsRefreshing(false);
    showToast("AI jobs refreshed", "success");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "embedding":
        return <Brain className="h-4 w-4" />;
      case "matching":
        return <Zap className="h-4 w-4" />;
      case "processing":
        return <Database className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const stats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    running: jobs.filter((j) => j.status === "running").length,
    failed: jobs.filter((j) => j.status === "failed").length,
    pending: jobs.filter((j) => j.status === "pending").length,
  };

  const avgProcessingTime =
    jobs
      .filter((j) => j.processing_time)
      .reduce((acc, j) => acc + (j.processing_time || 0), 0) /
      jobs.filter((j) => j.processing_time).length || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Processing Monitor</h1>
            <p className="text-muted-foreground">
              Real-time monitoring of AI jobs and processing queue
            </p>
          </div>
          <Button onClick={refreshJobs} disabled={isRefreshing}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.running}</p>
                  <p className="text-xs text-muted-foreground">Running</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(avgProcessingTime / 1000)}s
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processing Queue Health */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Queue Health
              </CardTitle>
              <CardDescription>Current processing queue status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Queue Capacity</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Processing Speed
                    </span>
                    <span className="text-sm">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-sm">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                System Alerts
              </CardTitle>
              <CardDescription>Recent system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">High Queue Load</p>
                    <p className="text-xs text-muted-foreground">
                      Processing queue is at 75% capacity
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">System Healthy</p>
                    <p className="text-xs text-muted-foreground">
                      All AI services are running normally
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent AI Jobs</CardTitle>
            <CardDescription>
              Latest AI processing jobs and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-mono text-sm">
                        {job.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(job.type)}
                          <span className="capitalize">{job.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.user_name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {job.user_type}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          {getStatusBadge(job.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm">{job.details}</p>
                          {job.error_message && (
                            <p className="text-xs text-red-600 mt-1">
                              Error: {job.error_message}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {job.processing_time ? (
                          <span className="text-sm">
                            {Math.round(job.processing_time / 1000)}s
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(job.created_at).toLocaleTimeString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
