export interface ProfileData {
  profile: UserProfile;
  loanStats: LoanStats;
  reviewsCount: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface LoanStats {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
}

export interface UpdateProfileData {
  profile: UserProfile;
}
