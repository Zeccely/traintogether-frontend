import { Goal } from "./goal";
import { UserPenalty } from "./userPenalty";

export interface User {
  id: number;
  username: string;
  name: string;
  passwordHash: string;
  goal: Goal;
  groupId: number;
  penalties: UserPenalty[];
}

export interface UserDetails {
  username: string;
  name: string;
}

export interface UserCreation {
  username: string;
  passwordInput: string;
  desiredName: string;
}

export interface LoginInput {
  username: string;
  passwordInput: string;
}
