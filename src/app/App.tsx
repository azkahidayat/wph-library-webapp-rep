import { RouterProvider } from 'react-router-dom';
import { router } from './../routes/router';
import { Toaster } from 'sonner';
import { CheckCircle2, CircleX } from 'lucide-react';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        icons={{
          success: <CheckCircle2 className='text-green-600 size-5' />,
          error: <CircleX className='text-red-600 size-5' />,
        }}
      />
    </>
  );
}

export default App;
