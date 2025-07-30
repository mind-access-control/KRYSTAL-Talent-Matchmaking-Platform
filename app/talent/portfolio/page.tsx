"use client";

import type React from "react";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Edit, Trash2, Play, ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface MediaItem {
  id: string;
  type: "photo" | "video";
  url: string;
  description: string;
  uploadDate: string;
}

export default function TalentPortfolio() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadDescription, setUploadDescription] = useState("");
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editDescription, setEditDescription] = useState("");

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      type: "photo",
      url: "/placeholder.jpg",
      description: "Professional headshot for fashion campaign",
      uploadDate: "2024-01-15",
    },
    {
      id: "2",
      type: "photo",
      url: "/placeholder.jpg",
      description: "Commercial modeling shoot for lifestyle brand",
      uploadDate: "2024-01-10",
    },
    {
      id: "3",
      type: "video",
      url: "/placeholder.jpg",
      description: "Behind the scenes video from recent photoshoot",
      uploadDate: "2024-01-08",
    },
    {
      id: "4",
      type: "photo",
      url: "/placeholder.svg?height=300&width=300",
      description: "Artistic portrait showcasing versatility",
      uploadDate: "2024-01-05",
    },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !uploadDescription.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and add a description",
        variant: "destructive",
      });
      return;
    }

    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: selectedFile.type.startsWith("video/") ? "video" : "photo",
      url: "/placeholder.jpg",
      description: uploadDescription,
      uploadDate: new Date().toISOString().split("T")[0],
    };

    setMediaItems((prev) => [newItem, ...prev]);
    setSelectedFile(null);
    setUploadDescription("");
    toast({
      title: "Success",
      description: "Media uploaded successfully!",
    });
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setEditDescription(item.description);
  };

  const handleSaveEdit = () => {
    if (!editingItem || !editDescription.trim()) return;

    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? { ...item, description: editDescription }
          : item
      )
    );
    setEditingItem(null);
    setEditDescription("");
    toast({
      title: "Success",
      description: "Description updated successfully!",
    });
  };

  const handleDelete = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Success",
      description: "Media deleted successfully!",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Management</h1>
            <p className="text-muted-foreground mt-1">
              Showcase your best work to attract potential clients.
            </p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link href="/talent/portfolio/preview">Preview Portfolio</Link>
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload New Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this media (max 150 characters)"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                maxLength={150}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {uploadDescription.length}/150 characters
              </p>
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !uploadDescription.trim()}
            >
              Upload Media
            </Button>
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Your Portfolio ({mediaItems.length} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.description}
                      className="w-full h-full object-cover"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded: {item.uploadDate}
                    </p>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mediaItems.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No media uploaded yet
                </h3>
                <p className="text-muted-foreground">
                  Start building your portfolio by uploading your best work.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Description</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  maxLength={150}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {editDescription.length}/150 characters
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
