"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ideasService, Idea } from "@/lib/data-utils";
import { Plus, Trash2, Edit2, Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function IdeasManagementPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "Lightbulb",
  });

  const loadIdeas = () => {
    const data = ideasService.getAllIdeas();
    setIdeas(data);
    setIsLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      loadIdeas();
    }, 100);
  }, []);

  const handleAddNew = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "Lightbulb",
    });
    setEditingId("new");
  };

  const handleSave = () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    if (editingId === "new") {
      const newIdea: Idea = {
        id: `idea-${Date.now()}`,
        ...formData,
      };
      ideasService.addIdea(newIdea);
    } else if (editingId) {
      ideasService.updateIdea(editingId, formData);
    }

    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "Lightbulb",
    });
    loadIdeas();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this idea?")) {
      ideasService.deleteIdea(id);
      loadIdeas();
    }
  };

  const handleEdit = (idea: Idea) => {
    setFormData({
      title: idea.title,
      description: idea.description,
      category: idea.category,
      icon: idea.icon,
    });
    setEditingId(idea.id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ideas & Vision
          </h1>
          <p className="text-muted-foreground">Manage your ideas and values</p>
        </div>
        {!editingId && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            New Idea
          </Button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId === "new" ? "Create New Idea" : "Edit Idea"}
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
              rows={4}
            />
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <Input
              placeholder="Icon name (lucide-react)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
            />
            <div className="flex gap-3">
              <Button onClick={handleSave}>Save Idea</Button>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    category: "",
                    icon: "Lightbulb",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.length === 0 ? (
          <Card className="p-8 text-center md:col-span-2">
            <p className="text-muted-foreground">No ideas yet</p>
          </Card>
        ) : (
          ideas.map((idea) => (
            <Card
              key={idea.id}
              className="p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(idea)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(idea.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {idea.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {idea.description}
              </p>
              <p className="text-xs text-primary">{idea.category}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
