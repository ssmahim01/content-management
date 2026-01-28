"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { blogService, BlogPost } from "@/lib/data-utils";
import { Plus, Trash2, Edit2, Calendar } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    featured: false,
  });

  const loadPosts = () => {
    const data = blogService.getAllPosts();
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      loadPosts();
    }, 100);
  }, []);

  const handleAddNew = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      featured: false,
    });
    setEditingId("new");
  };

  const handleSave = () => {
    if (!formData.title || !formData.slug) {
      alert("Title and slug are required");
      return;
    }

    if (editingId === "new") {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        ...formData,
        publishedAt: new Date().toISOString(),
      };
      blogService.addPost(newPost);
    } else if (editingId) {
      blogService.updatePost(editingId, formData);
    }

    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      featured: false,
    });
    loadPosts();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this post?")) {
      blogService.deletePost(id);
      loadPosts();
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      featured: post.featured,
    });
    setEditingId(post.id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Blog Posts
          </h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        {!editingId && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId === "new" ? "Create New Post" : "Edit Post"}
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input
              placeholder="Slug (URL-friendly)"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
            <Textarea
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={2}
            />
            <Textarea
              placeholder="Full content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <Input
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              <span className="text-sm text-foreground">Featured Post</span>
            </label>
            <div className="flex gap-3">
              <Button onClick={handleSave}>Save Post</Button>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    category: "",
                    author: "",
                    featured: false,
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
      <div className="space-y-2">
        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No blog posts yet</p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              className="p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.category}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(post)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
