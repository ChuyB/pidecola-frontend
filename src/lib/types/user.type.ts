export enum Role {
  ADMIN = "admin",
  USER = "user",
  DRIVER = "driver",
}

export interface User {
  created_at: string;
  date_joined: string;
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string;
  rating: number;
  rating_count: number;
  role: string;
  username: string;
  likes: number;
  dislikes: number;
  phone_number: string;
}
