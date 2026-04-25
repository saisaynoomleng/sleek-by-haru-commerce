'use client';

import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const ForgotPasswordPage = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddemailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [customError, setCustomError] = useState<{ error?: string }>({});
  const [code, setCode] = useState<string>('');
  const [isSentCode, setIsSentCode] = useState(false);

  const handleForgotPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const { error } = await signIn.create({
        identifier: emailAddress,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
      }

      await signIn.resetPasswordEmailCode.sendCode();
      setIsSentCode(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerifyCode = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleNewPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setCustomError({ error: 'Password do not match' });
      }

      const { error } = await signIn.resetPasswordEmailCode.submitPassword({
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
              console.log(session?.currentTask);
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

  const handleResendCode = async () => {
    try {
      await signIn.resetPasswordEmailCode.sendCode();
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Bounded isPadded className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
      <div className="overflow-hidden max-md:hidden">
        <Image
          src="/forgot-password.webp"
          alt=""
          width={400}
          height={600}
          className="min-w-full "
        />
      </div>

      {!isSentCode && (
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-y-5">
          <SectionTitle className="text-center">Reset Password</SectionTitle>

          <div className="space-y-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input
              type="email"
              id="email"
              onChange={(e) => setEmailAddemailAddress(e.target.value)}
            />
            {errors.fields.identifier && (
              <p className="form-error-message">
                {errors.fields.identifier.message}
              </p>
            )}
          </div>

          <Button>Reset</Button>
        </form>
      )}

      {isSentCode && signIn.status !== 'needs_new_password' ? (
        <form onSubmit={handleVerifyCode} className="flex flex-col gap-y-5">
          <SectionTitle className="text-center">Verify Code</SectionTitle>

          <div className="space-y-1">
            <label htmlFor="code" className="form-label">
              Code
            </label>
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

          <button type="button" onClick={handleResendCode}>
            Resend
          </button>
        </form>
      ) : null}

      {isSentCode && signIn.status === 'needs_new_password' ? (
        <form className="flex flex-col gap-y-5" onSubmit={handleNewPassword}>
          <SectionTitle>Set New Password</SectionTitle>

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
            {customError.error && (
              <p className="form-error-message">{customError.error}</p>
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

          <Button>Submit</Button>
        </form>
      ) : null}
    </Bounded>
  );
};

export default ForgotPasswordPage;
