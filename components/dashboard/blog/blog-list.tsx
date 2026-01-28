'use client'

import { BlogPost } from '@/types/dashboard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2, Plus } from 'lucide-react'

interface BlogListProps {
  blogs: BlogPost[]
  onEdit: (blog: BlogPost) => void
  onDelete: (id: string) => void
  onAdd: () => void
  isLoading?: boolean
}

export function BlogList({
  blogs,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
}: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <Card className='p-8 text-center border-indigo-200 dark:border-indigo-900'>
        <p className='text-slate-600 dark:text-slate-400 mb-4'>
          No blog posts yet. Create your first post!
        </p>
        <Button
          onClick={onAdd}
          className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          <Plus className='w-4 h-4' />
          Add Blog Post
        </Button>
      </Card>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-end mb-4'>
        <Button
          onClick={onAdd}
          className='gap-2 bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          <Plus className='w-4 h-4' />
          Add Blog Post
        </Button>
      </div>

      <div className='grid gap-4'>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className='p-5 border-indigo-200 dark:border-indigo-900 hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <h3 className='font-semibold text-slate-900 dark:text-white'>
                  {blog.title.en}
                </h3>
                <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                  বাংলা: {blog.title.bn}
                </p>
                <div className='flex items-center gap-2 mt-3'>
                  {blog.featured && (
                    <Badge className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300'>
                      Featured
                    </Badge>
                  )}
                  {blog.category && (
                    <Badge variant='outline' className='border-indigo-300'>
                      {blog.category}
                    </Badge>
                  )}
                  <span className='text-xs text-slate-500 dark:text-slate-400'>
                    {blog.readTime} min read
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => onEdit(blog)}
                  disabled={isLoading}
                  className='gap-1.5'
                >
                  <Edit2 className='w-4 h-4' />
                  Edit
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => onDelete(blog.id)}
                  disabled={isLoading}
                  className='gap-1.5 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30'
                >
                  <Trash2 className='w-4 h-4' />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
