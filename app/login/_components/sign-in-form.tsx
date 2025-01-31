"use client"
import { useState } from 'react'
import { z } from 'zod'
import { ZodError } from 'zod'
import { Mail, Lock, Github, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from "@/components/ui/toast"

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const MotionButton = motion(Button)
const MotionInput = motion(Input)

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const data = signInSchema.parse({ email, password })
      // Handle successful sign in
      console.log('Sign in data:', data)
      toast({
        title: "Successfully signed in!",
        description: "Friday, February 10, 2023 at 5:57 PM",
        // action:  <ToastAction altText='close'><X className="h-4 w-4 text-white" />  </ToastAction>
      })

    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
            toast({
                title:  issue.message,
                description: "Friday, February 10, 2023 at 5:57 PM",
                variant: "destructive",
                // action: <ToastAction altText='close'><X className="h-4 w-4 text-white" />  </ToastAction>
              })
        })
      } else {
         toast({
                title:  "'An unexpected error occurred",
                description: "Friday, February 10, 2023 at 5:57 PM",
                variant: "destructive",
                // action:  <ToastAction altText='close'><X className="h-4 w-4 text-white" />  </ToastAction>
              })

      }
    }
  }

  const handleGoogleSignIn = () => {
    // Handle Google OAuth
    console.log('Google sign in clicked')
  }

  const handleGithubSignIn = () => {
    // Handle GitHub OAuth
    console.log('GitHub sign in clicked')
  }
const {toast} = useToast()
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          className="space-y-2"
          variants={itemVariants}
        >
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <MotionInput
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          variants={itemVariants}
        >
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <MotionInput
              id="password"
              type="password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionButton
            type="submit"
            className="w-full"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Sign In
          </MotionButton>
        </motion.div>

        <motion.div 
          className="text-center text-sm"
          variants={itemVariants}
        >
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </motion.div>

        <Separator className="w-full" />

        <motion.div 
          className="grid gap-4"
          variants={itemVariants}
        >
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-200 rounded-md h-10 px-4 py-2 flex items-center justify-center space-x-2 bg-white"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGithubSignIn}
            className="w-full border border-gray-200 rounded-md h-10 px-4 py-2 flex items-center justify-center space-x-2 bg-white"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Github className="h-4 w-4" />
            <span>Continue with GitHub</span>
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}