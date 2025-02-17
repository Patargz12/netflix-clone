import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

/**
 * LoginForm Component
 *
 * This component renders a login form and handles the authentication process.
 * It manages form state, handles user input, and triggers the login mutation.
 */
export default function LoginForm() {
  // State to store form input values
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Get login mutation and loading state from our custom hook
  // - mutate: Function to call to perform login
  // - isPending: Boolean indicating if login is in progress
  const { mutate: login, isPending } = useAuth();

  /**
   * Handle form submission
   * @param e - Form event
   *
   * Prevents default form submission and triggers login mutation
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  /**
   * Handle input changes
   * @param e - Input change event
   *
   * Updates the credentials state when user types in inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
      <div className="w-[414px] space-y-4 p-12 px-16 bg-black/45">
        <h1 className="text-[32px] font-medium text-white mb-7">Sign In</h1>

        {/* Form with submit handler */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username input field */}
          <Input
            type="text"
            name="username"
            required
            value={credentials.username}
            onChange={handleChange}
            placeholder="mor_2314"
            className="h-[40px] bg-[#333333] border-0 rounded-[4px] text-white placeholder:text-[#8c8c8c] text-base px-5"
          />

          {/* Password input field */}
          <Input
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
            placeholder="83r5^_"
            className="h-[40px] bg-[#333333] border-0 rounded-[4px] text-white placeholder:text-[#8c8c8c] text-base px-5"
          />

          {/* Submit button with loading state */}
          <Button
            type="submit"
            variant="long"
            disabled={isPending}
            className="w-full h-[40px] bg-red-600 hover:bg-red-700 text-white font-normal text-base rounded-[4px] border-0"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Divider with "OR" text */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black/75 px-2 text-[13px] text-zinc-500">OR</span>
            </div>
          </div>

          {/* Alternative sign-in option */}
          <Button
            variant="secondary"
            className="w-full h-[40px] bg-[#454545] hover:bg-[#4f4f4f] text-white font-normal text-base rounded-[4px] border-0"
          >
            Use a Sign-In Code
          </Button>

          {/* Password recovery link */}
          <a
            href="/forgot-password"
            className="block text-[13px] text-zinc-400 hover:underline text-center mt-4"
          >
            Forgot Password?
          </a>

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-1 mt-2">
            <Checkbox
              id="remember"
              className="w-4 h-4 border-zinc-600 data-[state=checked]:bg-primary-500"
            />
            <label htmlFor="remember" className="text-[13px] font-normal text-zinc-400">
              Remember me
            </label>
          </div>

          {/* Additional information and links */}
          <div className="space-y-3 mt-4">
            <p className="text-[13px] text-zinc-400">
              New to Netflix?{' '}
              <a href="/signup" className="text-white hover:underline">
                Sign up now.
              </a>
            </p>
            <p className="text-[13px] text-zinc-500 leading-tight">
              This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{' '}
              <a href="/learn-more" className="text-blue-500 hover:underline">
                Learn more.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
