"use client"

import { Plus, Globe, FolderPlus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DirectoryTree } from "@/components/directory-tree"

export function DirectoryTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Directory</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your organization's sites, departments, and users
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <Globe className="h-4 w-4 mr-2" />
              Add Site
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus className="h-4 w-4 mr-2" />
              Add Department
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Add User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DirectoryTree />
    </div>
  )
} 