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

interface InitialValueData {
  title: string;
  isbn: string;
  categoryId: number;
  publishedYear: number;
  authorName?: string;
  description?: string;
  authorId?: number;
  availableCopies?: number;
  totalCopies?: number;
  coverImage?: File;
}

interface FormProps {
  initialValueData?: InitialValueData;
  isPending: boolean;
}

const Form = ({ initialValueData, isPending }: FormProps) => {
  const form = useForm({
    defaultValues: {
      title: initialValueData?.title ?? '',
      authorName: initialValueData?.authorName ?? '',
      categoryId: initialValueData?.categoryId ?? '',
      isbn: initialValueData?.isbn ?? '',
      publishedYear: initialValueData?.publishedYear ?? undefined,
      description: initialValueData?.description ?? '',
      authorId: initialValueData?.authorId ?? undefined,
      availableCopies: initialValueData?.availableCopies ?? 0,
      totalCopies: initialValueData?.totalCopies ?? 0,
      coverImage: initialValueData?.coverImage ?? undefined,
    },
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = (data: BookSchema) => {
    console.log(data);
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
