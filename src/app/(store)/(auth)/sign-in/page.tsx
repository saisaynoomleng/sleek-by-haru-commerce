'use client';

import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLogoGithub,
  IoLogoGoogle,
  IoLogoLinkedin,
} from 'react-icons/io5';

const SignInPage = () => {
  const { signIn, errors } = useSignIn();
  const [emailAddress, setEmailAddemailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const { error } = await signIn.password({
        identifier: emailAddress,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session.currentTask);
              return;
            }
            router.push(decorateUrl('/user'));
          },
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    try {
      await signIn.sso({
        strategy,
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/user',
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded isPadded className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
      <div className="overflow-hidden max-md:hidden">
        <Image
          src="/sign-in.jpg"
          alt=""
          width={400}
          height={800}
          className="min-w-full rounded-2xl object-cover"
        />
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-y-5 ">
        <SectionTitle className="text-center">Sign In</SectionTitle>

        <div className="flex justify-around items-center">
          <button
            type="button"
            className="cursor-pointer border p-1 rounded-2xl hover:border-brand-pink-500 hover:text-brand-pink-500"
            onClick={() => handleOAuth('oauth_google')}
          >
            <IoLogoGoogle />
          </button>

          <button
            type="button"
            className="cursor-pointer border p-1 rounded-2xl hover:border-brand-pink-500 hover:text-brand-pink-500"
            onClick={() => handleOAuth('oauth_github')}
          >
            <IoLogoGithub />
          </button>

          <button
            type="button"
            className="cursor-pointer border p-1 rounded-2xl hover:border-brand-pink-500 hover:text-brand-pink-500"
            onClick={() => handleOAuth('oauth_linkedin')}
          >
            <IoLogoLinkedin />
          </button>
        </div>

        <div className="flex justify-around gap-x-5 items-center">
          <div className="divider" />
          <p>Or</p>
          <div className="divider" />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Input
            type="email"
            id="email"
            onChange={(e) => setEmailAddemailAddress(e.target.value)}
            autoComplete="email"
          />
          {errors.fields.identifier && (
            <p className="form-error-message">
              {errors.fields.identifier.message}
            </p>
          )}
        </div>

        <div className="space-y-1 col-span-full relative">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          {errors.fields.password && (
            <p className="form-error-message">
              {errors.fields.password.message}
            </p>
          )}
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword((open) => !open)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          )}
        </div>

        <Button className="col-span-full">Sign In</Button>

        <div id="clerk-captcha" />

        <div className="flex justify-between items-center">
          <p>
            Not a member yet?
            <Link
              href="/sign-up"
              className="underline hover:text-brand-pink-500"
            >
              Sign Up
            </Link>
          </p>

          <Link
            href="/forgot-password"
            className="underline hover:text-brand-pink-500"
          >
            Forgot Password
          </Link>
        </div>
      </form>
    </Bounded>
  );
};

export default SignInPage;
