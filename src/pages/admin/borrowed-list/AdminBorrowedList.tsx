import AdminSearchField from '../components/shared/AdminSearchField';

const AdminBorrowedList = () => {
  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <h2 className='font-bold text-display-xs lg:text-display-sm'>
        Borrowed List
      </h2>
      <AdminSearchField />
    </div>
  );
};

export default AdminBorrowedList;
