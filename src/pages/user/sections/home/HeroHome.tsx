import girl from '@/assets/images/hero-images/flying-book-with-girl.webp';
import cloud from '@/assets/images/hero-images/cloud.webp';
import book1 from '@/assets/images/hero-images/book-1.webp';
import boy from '@/assets/images/hero-images/flying-paper-plane-with-boy.webp';
import book2 from '@/assets/images/hero-images/book-2.webp';
const HeroHome = () => {
  return (
    <section
      id='hero'
      className='relative flex flex-col justify-center items-center w-full h-33.25 sm:h-65 lg:h-110.25 bg-primary-gradient rounded-2xl lg:rounded-4xl overflow-hidden '
    >
      <p className='relative z-5 text-3xl text-[#6597E8] font-bold sm:text-[55px] md:text-[60px] lg:text-[82.52px] text-center [text-shadow:-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff,-2px_0_0_#fff,2px_0_0_#fff,0_-2px_0_#fff,0_2px_0_#fff] sm:[text-shadow:-4px_-4px_0_#fff,4px_-4px_0_#fff,-4px_4px_0_#fff,4px_4px_0_#fff,-5px_0_0_#fff,5px_0_0_#fff,0_-5px_0_#fff,0_5px_0_#fff]'>
        Welcome to <br /> Booky
      </p>
      <div className='absolute inset-0 pointer-events-none'>
        <img
          src={girl}
          alt='girl on a flying book'
          className='absolute w-30 sm:w-[clamp(220px,65vw,250px)] lg:w-[clamp(100px,35vw,437px)] left-0 top-[clamp(8px,3vw,27px)] -translate-x-1/2 rotate-[-6.64deg] z-1'
        />
        <img
          src={cloud}
          alt='cloud'
          className='absolute w-30 sm:w-[clamp(220px,65vw,250px)] lg:w-[clamp(100px,35vw,437px)] left-0 top-0 -translate-y-1/2 -translate-x-1/3 rotate-[-16.67deg] mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]'
        />
        <img
          src={book1}
          alt='cloud'
          className='absolute w-15 sm:w-[clamp(80px,15vw,130px)] lg:w-[clamp(80px,15vw,200px)] left-0 bottom-0 translate-y-[45%] sm:translate-y-[55%] -translate-x-1/5 rotate-[70.48deg]'
        />
        <img
          src={boy}
          alt='cloud'
          className='absolute w-25 sm:w-[clamp(200px,60vw,210px)] lg:w-[clamp(100px,28vw,370px)] right-0 top-[clamp(8px,3vw,27px)] translate-x-[40%] scale-x-[-1] z-1'
        />
        <img
          src={cloud}
          alt='cloud'
          className='absolute w-30 sm:w-[clamp(220px,65vw,250px)] lg:w-[clamp(100px,35vw,437px)] right-0 top-0 -translate-y-1/2 translate-x-1/3 rotate-[16.67deg] mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]  scale-x-[-1]'
        />
        <img
          src={book2}
          alt='cloud'
          className='absolute w-15 sm:w-[clamp(80px,15vw,130px)] lg:w-[clamp(80px,15vw,200px)] right-0 bottom-0 translate-y-[45%] sm:translate-y-[48%] translate-x-1/9 rotate-[-10deg]'
        />
      </div>
    </section>
  );
};

export default HeroHome;
