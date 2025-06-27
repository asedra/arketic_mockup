"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Filter, Mail, Phone, MapPin, Calendar, Building, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data import
import peopleData from "./mock/people.json"

interface Person {
  id: string
  name: string
  email: string
  avatar: string
  initials: string
  role: string
  department: string
  title: string
  site: string
  status: string
  phone: string
  location: string
  hireDate: string
}

export function PeopleTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [siteFilter, setSiteFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const departments = useMemo(() => {
    const depts = new Set(peopleData.map((person: Person) => person.department))
    return Array.from(depts)
  }, [])

  const sites = useMemo(() => {
    const siteList = new Set(peopleData.map((person: Person) => person.site))
    return Array.from(siteList)
  }, [])

  const roles = useMemo(() => {
    const roleList = new Set(peopleData.map((person: Person) => person.role))
    return Array.from(roleList)
  }, [])

  const filteredPeople = useMemo(() => {
    return peopleData.filter((person: Person) => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.title.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = departmentFilter === "all" || person.department === departmentFilter
      const matchesSite = siteFilter === "all" || person.site === siteFilter
      const matchesRole = roleFilter === "all" || person.role === roleFilter

      return matchesSearch && matchesDepartment && matchesSite && matchesRole
    })
  }, [searchTerm, departmentFilter, siteFilter, roleFilter])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">People</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your organization's people and their information
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Person
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search people by name, email, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={siteFilter} onValueChange={setSiteFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              {sites.map((site) => (
                <SelectItem key={site} value={site}>{site}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Users className="h-4 w-4" />
        <span>{filteredPeople.length} people found</span>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPeople.map((person: Person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {person.name}
                    </CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {person.title}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={person.role === "Admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {person.role}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{person.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="h-3 w-3" />
                  <span>{person.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="h-3 w-3" />
                  <span>{person.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Building className="h-3 w-3" />
                  <span>{person.department}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>Hired {formatDate(person.hireDate)}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <Badge variant="outline" className="text-xs">
                  {person.site}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No people found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
} 