'use client';

import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@clerk/nextjs';
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
import { OAuthStrategy } from '@clerk/shared/types';

const SignUpPage = () => {
  const { signUp, errors } = useSignUp();
  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [showEmailCode, setShowEmailCode] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPasswordError({});

    try {
      if (password !== confirmPassword) {
        setPasswordError({ confirmPassword: 'Passwords not match' });
        return;
      }

      const { error } = await signUp.password({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      if (error?.code) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      await signUp.verifications.sendEmailCode();
      setShowEmailCode(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e: React.SubmitEvent) => {
    e.preventDefault();

    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          router.push(decorateUrl('/user'));
        },
      });
    }
  };

  const handleResendCode = async () => {
    try {
      await signUp.verifications.sendEmailCode();
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    try {
      await signUp.sso({
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
      <div className="overflow-hidden hidden md:block">
        <Image
          src="/sign-up.jpg"
          alt=""
          width={600}
          height={600}
          className="min-w-full object-cover rounded-2xl"
        />
      </div>

      {showEmailCode ? (
        <form onSubmit={handleVerify} className="flex flex-col gap-y-5">
          <SectionTitle>Verify Password</SectionTitle>

          <p>
            We&apos;ve sent a verification code to{' '}
            <span className="font-semibold">{emailAddress}</span>
          </p>

          <div className="space-y-1">
            <label htmlFor="code">Code</label>
            <Input
              type="text"
              id="code"
              onChange={(e) => setCode(e.target.value)}
            />
            {errors.fields.code && (
              <p className="form-error-message">{errors.fields.code.message}</p>
            )}
          </div>

          <Button>Verify</Button>

          <button
            type="button"
            onClick={handleResendCode}
            className="bg-transparent self-end underline border-none cursor-pointer hover:text-brand-pink-500"
          >
            Resend Code?
          </button>

          <div id="clerk-captcha" />
        </form>
      ) : (
        <form onSubmit={handleSignUp} className="flex flex-col gap-y-5">
          <SectionTitle className="text-center">Sign Up</SectionTitle>

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

          <div className="flex justify-between items-center gap-x-5">
            <div className="divider" />
            <p>Or</p>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
              {errors.fields.firstName && (
                <p className="form-error-message">
                  {errors.fields.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
              {errors.fields.lastName && (
                <p className="form-error-message">
                  {errors.fields.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-1 col-span-full">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                id="email"
                onChange={(e) => setEmailAddress(e.target.value)}
                autoComplete="email"
                required
              />
              {errors.fields.emailAddress && (
                <p className="form-error-message">
                  {errors.fields.emailAddress.message}
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
              <button
                type="button"
                onClick={() => setShowPassword((open) => !open)}
                className="absolute right-3 top-9 cursor-pointer"
              >
                {showPassword ? (
                  <span>
                    <IoEyeOffOutline />
                  </span>
                ) : (
                  <span>
                    <IoEyeOutline />
                  </span>
                )}
              </button>
            </div>

            <div className="space-y-1 col-span-full relative">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
              />
              {passwordError.confirmPassword && (
                <p className="form-error-message">
                  {passwordError.confirmPassword}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((open) => !open)}
                className="absolute right-3 top-9 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <span>
                    <IoEyeOffOutline />
                  </span>
                ) : (
                  <span>
                    <IoEyeOutline />
                  </span>
                )}
              </button>
            </div>

            <div className="col-span-full">
              <label htmlFor="checkbox" className="flex items-center gap-x-1">
                <Checkbox
                  id="checkbox"
                  onCheckedChange={() => setCheck((prev) => !prev)}
                />
                Accept
                <Link
                  href="/terms-and-conditions"
                  className="underline hover:text-brand-pink-400"
                >
                  User Terms&Conditions
                </Link>
              </label>
            </div>

            <Button disabled={!check} className="col-span-full">
              Sign Up
            </Button>

            <div id="clerk-captcha" />

            <p>
              Already a member?{' '}
              <Link
                href="/sign-in"
                className="underline hover:text-brand-pink-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      )}
    </Bounded>
  );
};

export default SignUpPage;
