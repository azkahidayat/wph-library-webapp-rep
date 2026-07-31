import { footer } from '@/data/footer';
import Logo from '../shared/Logo';

const Footer = () => {
  return (
    <footer className='px-4 lg:px-30 m-auto flex flex-col items-center py-10 lg:py-20 border-t'>
      <Logo />
      <p className='font-semibold text-sm mt-4 mb-4 lg:mt-5.5 lg:mb-10 text-center'>
        {footer.description}
      </p>
      <p className='font-bold text-md mb-5'>{footer.socialMediaTitle}</p>
      <div className='flex gap-3'>
        {footer.socialMedia.map((item) => (
          <a
            href={item.url}
            target='_blank'
            key={item.id}
            className='size-10 rounded-full aspect-square shrink-0 border flex justify-center items-center cursor-pointer'
          >
            <img src={item.icon} alt={`${item.name} icon`} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
