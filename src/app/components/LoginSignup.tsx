import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);
  const { state,dispatch } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        login: email,
        password
      });
      const { auth, user } = response.data;

      dispatch({ type: 'SET_USER', payload: {
        id: user.user_id,
        name: user.username,
        permission: user.permission
      }});
      dispatch({ type: 'SET_TOKENS', payload: {
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token
      }});
      console.log(auth, user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        email: email,
        password,
        username: name,
        accessToken: state.accessToken 
      });
      const { auth, user } = response.data;

      dispatch({ type: 'SET_USER', payload: {
        id: user.user_id,
        name: user.username,
        permission: user.permission
      }});
      dispatch({ type: 'SET_TOKENS', payload: {
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token
      }});
      console.log(auth, user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

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
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-2" onClick={handleSubmit}>
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