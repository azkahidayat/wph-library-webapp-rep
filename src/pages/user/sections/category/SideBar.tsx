import HorizontalLine from '@/components/shared/HorizontalLine';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { categories, type CategorySlug } from '@/data/categories';
import { TiStarFullOutline } from 'react-icons/ti';
import { useSearchParams } from 'react-router-dom';

const SideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const rating = searchParams.get('minRating') || undefined;

  const handleCategoryClick = (value: CategorySlug) => {
    const params = new URLSearchParams(searchParams);

    params.set('category', value);

    setSearchParams(params);
  };

  const handleRatingClick = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('minRating', value);

    setSearchParams(params);
  };
  return (
    <div className='hidden py-4 lg:flex flex-col gap-6 max-w-66.5 shrink-0 w-full'>
      <div className='flex flex-col gap-2.5 px-4'>
        <p className='font-bold text-md'>FILTER</p>
        <p className='font-bold text-lg'>Category</p>
        <RadioGroup defaultValue={category} className='w-full'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex items-center gap-3 w-full'
              onClick={() => handleCategoryClick(category.slug)}
            >
              <RadioGroupItem value={category.slug} id={category.slug} />
              <label
                htmlFor={category.slug}
                className='font-medium text-md w-full cursor-pointer'
              >
                {category.name}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <HorizontalLine />
      <div className='flex flex-col gap-2.5 px-4'>
        <p className='font-bold text-lg'>Rating</p>
        <RadioGroup defaultValue={rating} className='w-full'>
          {Array.from({ length: 5 }).map((_, index) => {
            const value = 5 - index;
            return (
              <div
                key={index}
                className='flex items-center gap-3 w-full'
                onClick={() => handleRatingClick(String(value))}
              >
                <RadioGroupItem value={String(value)} id={String(value)} />
                <label
                  htmlFor={String(value)}
                  className='font-medium text-md w-full cursor-pointer flex items-center gap-1'
                >
                  <TiStarFullOutline className='fill-[#FFAB0D] size-6' />{' '}
                  {value}
                </label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default SideBar;
