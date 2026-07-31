import type { AdminUser } from '@/features/admin/types/admin-user';
import { formatDateTime } from '@/utils/formate-date';

interface UserCardsProps {
  users: AdminUser[];
  start: number;
}

interface CardUserData {
  id: number;
  label: string;
  value: string | number;
}

const UserCards = ({ users, start }: UserCardsProps) => {
  return (
    <div className='flex flex-col gap-3.75'>
      {users.map((user, index) => {
        const cardUserData: CardUserData[] = [
          {
            id: 1,
            label: 'No',
            value: index + start,
          },
          {
            id: 2,
            label: 'Name',
            value: user.name,
          },
          {
            id: 3,
            label: 'Email',
            value: user.email,
          },
          {
            id: 4,
            label: 'Nomor Handphone',
            value: user.phone,
          },
          {
            id: 5,
            label: 'Created at',
            value: formatDateTime(user.createdAt),
          },
        ];
        return (
          <div
            key={user.id}
            className='shadow-soft rounded-xl p-4 flex flex-col gap-1'
          >
            {cardUserData.map((item) => (
              <div
                key={item.id}
                className='flex justify-between items-center gap-15'
              >
                <p className='font-semibold text-sm'>{item.label}</p>
                <p className='font-bold text-sm break-all text-right'>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default UserCards;
