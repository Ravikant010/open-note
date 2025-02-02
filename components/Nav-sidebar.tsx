"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BarChart,
  BookOpen,
  Calendar,
  Home,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { UserAvatar } from "./user-avatar";

export function Sidebar() {
  return (
    <SidebarPrimitive>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
         <UserAvatar />
         
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            disabled
          >
            <Home className="h-4 w-4" />
            Dashboard
            <Badge variant="outline" className="ml-auto">Soon</Badge>
          </Button>
         
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            disabled
          >
            <Users className="h-4 w-4" />
            Community
            <Badge variant="outline" className="ml-auto">Soon</Badge>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            disabled
          >
            <Calendar className="h-4 w-4" />
            Planning
            <Badge variant="outline" className="ml-auto">Soon</Badge>
          </Button>
          {/* <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            disabled
          >
            <Search className="h-4 w-4" />
            Discover
            <Badge variant="outline" className="ml-auto">Soon</Badge>
          </Button> */}
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            disabled
          >
            <BarChart className="h-4 w-4" />
            Analytics
            <Badge variant="outline" className="ml-auto">Soon</Badge>

          </Button>
          <Link href="/note/editor">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"

          >
            <BookOpen className="h-4 w-4" />
            Create
           
          </Button>
          </Link>
          <Link href="/profile">
  <Button 
    variant="ghost" 
    className="w-full justify-start gap-2"
  >
    <User className="h-4 w-4" />
    Profile
  </Button>
</Link>
          <Link href="/settings">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
