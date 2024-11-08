export type User = {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};

export interface UserPayload {
  id: number;
  username: string;
}
