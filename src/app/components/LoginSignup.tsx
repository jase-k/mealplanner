import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { GithubIcon, MailIcon } from 'lucide-react'

export default function Component() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome to MealPlanner</CardTitle>
        <CardDescription>
          {isLogin ? "Log in to your account" : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setIsLogin(value === 'login')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" placeholder="Enter your email" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" placeholder="Enter your password" type="password" />
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" placeholder="Enter your email" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" placeholder="Create a password" type="password" />
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-2">
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
        <div className="relative w-full mb-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}