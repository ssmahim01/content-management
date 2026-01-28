"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { mediaService, MediaItem } from "@/lib/data-utils";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function MediaManagementPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imagePath: "",
    category: "",
  });

  const loadMedia = () => {
    const data = mediaService.getAllMedia();
    setMediaItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      loadMedia();
    }, 100);
  }, []);

  const handleAddNew = () => {
    setFormData({ title: "", description: "", imagePath: "", category: "" });
    setEditingId("new");
  };

  const handleSave = () => {
    if (!formData.title || !formData.imagePath) {
      alert("Please fill required fields");
      return;
    }

    if (editingId === "new") {
      const newMedia: MediaItem = {
        id: `media-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        imagePath: formData.imagePath,
        category: formData.category,
        uploadedAt: new Date().toISOString(),
      };
      mediaService.addMedia(newMedia);
    } else if (editingId) {
      mediaService.updateMedia(editingId, formData);
    }

    setEditingId(null);
    setFormData({ title: "", description: "", imagePath: "", category: "" });
    loadMedia();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      mediaService.deleteMedia(id);
      loadMedia();
    }
  };

  const handleEdit = (item: MediaItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      imagePath: item.imagePath,
      category: item.category,
    });
    setEditingId(item.id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Media Gallery
          </h1>
          <p className="text-muted-foreground">Manage your portfolio images</p>
        </div>
        {!editingId && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId === "new" ? "Add New Media" : "Edit Media"}
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <Input
              placeholder="Image Path (e.g., /1.jpg)"
              value={formData.imagePath}
              onChange={(e) =>
                setFormData({ ...formData, imagePath: e.target.value })
              }
            />
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <div className="flex gap-3">
              <Button onClick={handleSave}>Save</Button>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    imagePath: "",
                    category: "",
                  });
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map((item) => (
          <Card
            key={item.id}
            className="p-4 hover:border-primary/50 transition-colors"
          >
            <div className="aspect-video bg-secondary/50 rounded-lg mb-4 overflow-hidden">
              <Image
                src={item.imagePath || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-foreground mb-1 truncate">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(item)}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleDelete(item.id)}
                size="sm"
                variant="outline"
                className="gap-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
