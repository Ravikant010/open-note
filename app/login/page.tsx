"use client"
import { BrandingSF_Font } from '@/lib/font'
import { SignInForm } from './_components/sign-in-form'
import { SignUpForm } from './_components/sign-up-form'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <div className={`w-full max-w-md p-4 text-4xl leading-relaxed font-bold ${BrandingSF_Font.className}`}>
          {activeTab === 'signin' ? (
            <>
              Hello <br />
              Sign In!
            </>
          ) : (
            <>
              Welcome <br />
              Sign Up!
            </>
          )}
        </div>
        
        <Tabs 
          defaultValue="signin" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardContent className="pt-6">
                <SignInForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardContent className="pt-6">
                <SignUpForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}