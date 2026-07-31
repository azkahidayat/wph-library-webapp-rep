export type BorrowData = {
  loans: Loan[];
  failed: unknown[];
  removedFromCart: number;
  message: string;
};

export type Loan = {
  id: number;
  userId: number;
  bookId: number;
  status: 'BORROWED';
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  returnByMessage: string;
};
