'use client'
import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BookOpen, ListChecks, MessageSquare } from 'lucide-react'

export default function Home() {
  const { state, dispatch } = useUser();

  useEffect(() => {
    const performAnonymousLogin = async () => {
      try {
        const response = await axios.post('/api/anonymous_login');
        const { access_token, refresh_token } = response.data;
        dispatch({ 
          type: 'SET_TOKENS', 
          payload: { accessToken: access_token, refreshToken: refresh_token } 
        });
        console.log('Anonymous login successful');
      } catch (error) {
        console.error('Anonymous login failed:', error);
      }
    };

    if (!state.accessToken) {
      console.log('No access token set, performing anonymous login');
      performAnonymousLogin();
    } else {
      console.log('Access token is set:', state.accessToken);
    }
  }, [state.accessToken, dispatch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to MealPlanner</h1>
      <p className="text-xl mb-12 text-center max-w-2xl">
        Your all-in-one solution for meal planning, recipe management, and smart shopping lists.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2" />
              Save Recipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Collect and organize your favorite recipes in one place. Easily access them anytime, anywhere.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListChecks className="mr-2" />
              Smart Shopping Lists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Generate shopping lists automatically from your meal plans. Never forget an ingredient again.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2" />
              Natural Language Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Interact with your meal planner using natural language. Plan meals, add recipes, and more with simple commands.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-2xl mb-12">
        <CardHeader>
          <CardTitle>Try It Out!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Here are some things you can say:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Add spaghetti bolognese to my meal plan for Thursday</li>
            <li>Show me vegetarian recipes for next week</li>
            <li>What ingredients do I need for my meals this weekend?</li>
          </ul>
        </CardContent>
      </Card>

      <Button asChild size="lg">
        <Link href="/login">Get Started</Link>
      </Button>
    </main>
  )
}