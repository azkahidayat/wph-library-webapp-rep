import { Button } from '@/components/ui/button';
import type { BookSchema } from '@/features/admin/schema/bookSchema';
import { ArrowUpToLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GoTrash } from 'react-icons/go';
import { LuCloudUpload } from 'react-icons/lu';

const UploadImage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext<BookSchema>();
  return (
    <div className='flex flex-col'>
      <label htmlFor='cover-image' className='font-bold text-sm'>
        Cover Image
      </label>

      <label
        htmlFor='cover-image'
        className='border border-dashed p-4 rounded-xl flex flex-col items-center gap-3 cursor-pointer'
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt='Cover Preview'
              className='w-40 h-56 rounded-lg object-cover'
            />
            <div className='flex gap-3'>
              <Button
                type='button'
                variant='outline'
                className='font-semibold text-sm px-3 rounded-lg flex gap-1 h-10'
                onClick={() => inputRef.current?.click()}
              >
                <ArrowUpToLine /> Change Image{' '}
              </Button>
              <Button
                type='button'
                variant='outline'
                className='font-semibold text-sm px-3 rounded-lg flex gap-1 h-10 text-red'
                onClick={() => setPreview(null)}
              >
                <GoTrash /> Delete Image{' '}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className='size-10 flex justify-center items-center border rounded-md'>
              <LuCloudUpload className='size-5' />
            </div>
            <div>
              <p className='font-semibold text-sm'>
                <span className='font-bol text-primary-300'>
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
            </div>
          </>
        )}
        <p className='font-semibold text-sm text-center'>
          {' '}
          PNG or JPG (max. 5mb)
        </p>
        <input
          type='file'
          ref={inputRef}
          id='cover-image'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setValue('coverImage', file, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setPreview(URL.createObjectURL(file));
          }}
          className='hidden'
        />
      </label>
    </div>
  );
};

export default UploadImage;
