import InputField from '@/components/shared/InputField';
import {
  bookSchema,
  type BookSchema,
} from '@/features/admin/schema/bookSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import SelectCategory from './SelectCategory';
import { Button } from '@/components/ui/button';
import Description from './Description';
import UploadImage from './UploadImage';
import type { BookAdminPayload } from '@/features/admin/service/bookAdmin.service';

export interface InitialValueData {
  title: string | undefined;
  isbn: string | undefined;
  categoryId: number | undefined;
  publishedYear: number | undefined;
  authorName: string | undefined;
  description: string | undefined;
  authorId?: number;
  availableCopies?: number;
  totalCopies?: number;
  coverImage?: File;
}

interface FormProps {
  initialValueData?: InitialValueData;
  isPending: boolean;
  onSubmitBook: (data: BookAdminPayload) => void;
}

const Form = ({ initialValueData, isPending, onSubmitBook }: FormProps) => {
  console.log(initialValueData?.authorName);
  const form = useForm({
    defaultValues: {
      title: initialValueData?.title ?? '',
      authorName: initialValueData?.authorName ?? '',
      isbn: initialValueData?.isbn ?? '',
      publishedYear: initialValueData?.publishedYear ?? undefined,
      description: initialValueData?.description ?? '',
      categoryId: initialValueData?.categoryId ?? '',
      authorId: initialValueData?.authorId ?? undefined,
      availableCopies: initialValueData?.availableCopies ?? 0,
      totalCopies: initialValueData?.totalCopies ?? 0,
      coverImage: initialValueData?.coverImage ?? undefined,
    },
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = (data: BookSchema) => {
    const payload: BookAdminPayload = {
      title: data.title,
      categoryId: data.categoryId,
      isbn: data.isbn,
      publishedYear: data.publishedYear,
      authorName: data.authorName,
      description: data.description ?? undefined,
      coverImage: data.coverImage ?? undefined,
    };
    onSubmitBook(payload);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className='flex flex-col gap-4'
      >
        <InputField
          label='Title *'
          name='title'
          register={form.register}
          errorMessage={form.formState.errors.title?.message}
        />
        <InputField
          label='Author *'
          name='authorName'
          register={form.register}
          errorMessage={form.formState.errors.authorName?.message}
        />
        <InputField
          label='Published Year *'
          name='publishedYear'
          register={form.register}
          errorMessage={form.formState.errors.publishedYear?.message}
        />
        <SelectCategory />
        <InputField
          label='ISBN *'
          name='isbn'
          register={form.register}
          errorMessage={form.formState.errors.isbn?.message}
        />
        <Description />
        <UploadImage />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
