"use client";
import { FormEvent, JSX, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      setLoading(true);
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error);
        return toast.error(error.message || "Registration failed");
      }
      
      return toast.success("Registration successful! Please check your email for confirmation.");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-screen min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="text-center my-3">Create Your Account</CardHeader>
        <CardContent>
          <form className="w-[280px] lg:w-[500px]" onSubmit={handleRegister}>
            <div className="flex gap-2 mb-3 flex-col">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                name="fullName"
                type="text"
                required
                id="fullName"
                placeholder="John Doe"
              />
            </div>
            <div className="flex gap-2 mb-3 flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                required
                id="email"
                placeholder="example@yahoo.com"
              />
            </div>
            <div className="flex gap-2 mb-3 flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="*********"
                name="password"
                id="password"
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer"
            >
              Register
              {loading ? <Loader2 className="w-3 h-3 animate-spin ml-2" /> : null}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
  
