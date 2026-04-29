'use client';

import { handleUpdateProfilePhotoForm } from '@/actions/handleUpdateProfilePhotoForm';
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Upload } from 'lucide-react';
import SubmitButton from '../shared/SubmitButton';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

const UpdateProfilePhotoForm = () => {
  const [state, actionFunction] = useActionState(handleUpdateProfilePhotoForm, {
    success: false,
    message: '',
    field: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seletedFile = e.target.files?.[0];

    if (!seletedFile) return;

    setFile(seletedFile);
    setPreview(URL.createObjectURL(seletedFile));
  };

  const handleDeleteFile = () => {
    setFile(null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      redirect('/user');
    }

    if (!state.success) {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <Form
      action={actionFunction}
      formEncType="multipart/form-data"
      className="flex flex-col gap-y-3"
    >
      <div className="space-y-1 flex flex-col gap-y-3 justify-center items-center border rounded-2xl p-5">
        <label htmlFor="file">Upload New Profile Photo</label>
        <Input
          type="file"
          accept="image/*"
          id="file"
          name="file"
          className="sr-only"
          onChange={handleFileUpload}
        />
        {preview && file ? (
          <div className="relative overflow-hidden space-y-2">
            <Image
              src={preview}
              width={100}
              height={100}
              alt="preview image"
              className="rounded-sm mx-auto"
            />
            <button
              type="button"
              className="absolute top-0 text-brand-red-500 cursor-pointer right-0"
              onClick={handleDeleteFile}
            >
              <IoClose />
            </button>
            <p className="text-brand-black-100/50 text-fs-200">{file.name}</p>
            <p className="text-brand-black-100/50 text-fs-200">
              size: {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <Upload className="text-brand-black-200/50" />
        )}
      </div>

      <SubmitButton className="self-start">Save Changes</SubmitButton>
    </Form>
  );
};

export default UpdateProfilePhotoForm;
