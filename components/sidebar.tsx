"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sidebar as SidebarPrimitive, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { BarChart, BookOpen, Calendar, Home, Search, Settings, Users } from "lucide-react"

export function Sidebar() {
  return (
    <SidebarPrimitive>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-semibold">Your Name</h2>
            <p className="text-xs text-muted-foreground">@username</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" />
            Content
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="h-4 w-4" />
            Community
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Calendar className="h-4 w-4" />
            Planning
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Search className="h-4 w-4" />
            Discover
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  )
}

