import ReviewsGrid from './components/ReviewsGrid';

const Reviews = () => {
  return (
    <section id='reviews' className='relative flex flex-col gap-5 lg:gap-10'>
      <h2 className='font-bold text-display-xs lg:text-display-lg'>Review</h2>
      <div>
        <ReviewsGrid />
      </div>
    </section>
  );
};

export default Reviews;
