import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Plus } from "lucide-react"


import { Sidebar } from "@/components/Nav-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { BrandingSF_Font, Pacifico_Regular } from "@/lib/font"
export default function OnBoardingPage() {
    return (
      <SidebarProvider className="bg-transparent mx-auto">
        <div className={` ${BrandingSF_Font.className}  flex min-h-screen mx-auto text-gray-900`}>
          {/* Sidebar */}
          <Sidebar  />
  
          {/* Content Area */}
          <div className="flex flex-1 flex-col min-w-0">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-transparent px-6">
              <SidebarTrigger className="bg-transparent" />
              <h1 className="text-xl font-semibold"></h1>
            </header>
  
            <div className="flex-1 p-8">
              <div className="mx-auto max-w-6xl min-w-[300px] md:min-w-[500px] lg:min-w-[700px]">
                {/* Header */}
                <div className={`${BrandingSF_Font.className} mb-8`}>
                    <h1 className="text-3xl font-bold mb-2">Hi Ravikant</h1>
                  <h1 className="text-3xl font-bold mb-2">Welcome to <span className={`${Pacifico_Regular.className} text-orange-500`}>Open Note! </span></h1>
                  <p className="text-muted-foreground">Get started with content creation, planning, and discovery</p>
                </div>
  
                {/* Quick Start Guide */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Quick Start Guide</h2>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Content Creation */}
                    <Card className="min-w-[200px]">
                      <CardHeader>
                        <CardTitle>Create & Share Content</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Start writing with our AI-powered editor and share your stories with the community.
                        </p>
                        <Button className="w-full">Get Started</Button>
                      </CardContent>
                    </Card>
  
                    {/* Planning Tools */}
                    <Card className="min-w-[200px]">
                      <CardHeader>
                        <CardTitle>Planning Tools</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Organize your content calendar and schedule posts effectively.
                        </p>
                        <Button className="w-full">Get Started</Button>
                      </CardContent>
                    </Card>
  
                    {/* Discovery */}
                    <Card className="min-w-[200px]">
                      <CardHeader>
                        <CardTitle>Discover Content</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Explore trending topics and connect with writers who share your interests.
                        </p>
                        <Button className="w-full">Get Started</Button>
                      </CardContent>
                    </Card>
                  </div>
  
                  {/* Featured Content Section */}
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Featured Content</h2>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="min-w-[250px] shadow-none ">
                          <div className="aspect-video w-full bg-muted" />
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">Featured Post Title</h3>
                            <p className="text-sm text-muted-foreground">
                              A brief preview of the featured post content...
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }
  



export  function OnBoarding() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-6">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Tabs defaultValue="overview" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks 1</TabsTrigger>
              <TabsTrigger value="threads">Threads 1</TabsTrigger>
              <TabsTrigger value="resources">Resources 2</TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Manage
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title Section */}
          <div className="relative">
            <h1 className="text-3xl font-semibold">Morning Team!</h1>
            <p className="text-muted-foreground">Collaborate with your team and organize your work here!</p>
            <div className="absolute right-0 top-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SYFYVg5g3yK08NLNbuGanWHFKp86xC.png"
                alt="Decorative curve"
                className="h-24 w-32 object-contain opacity-50"
              />
            </div>
          </div>

          {/* Actions Section */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-medium">
              <span className="h-4 w-4 rounded-full border" />
              Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Create a Page",
                  description: "Create your first Client to start building your Clients knowledge base.",
                },
                {
                  title: "Create a Task",
                  description: "Create your first Case to start building your Cases knowledge base.",
                },
                {
                  title: "Create a Thread",
                  description: "Create your first Client to start building your Clients knowledge base.",
                },
              ].map((action, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Button size="sm" variant="default">
                      Create
                    </Button>
                    <Button size="sm" variant="link" className="text-muted-foreground">
                      Generate example
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Pinned Items Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-medium">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border text-[10px]">📌</span>
                Pinned Items
                <ChevronDown className="h-4 w-4" />
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Pin a new item
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <Button variant="ghost" className="h-auto w-full justify-start p-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Pin an item
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Latest Activity Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-medium">
                Latest activity
                <ChevronDown className="h-4 w-4" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

