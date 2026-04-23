import { Goal } from "./goal";
import { UserPenalty } from "./userPenalty";

export interface User {
  id: number;
  username: string;
  name: string;
  passwordhash: string;
  goal: Goal;
  groupId: number;
  penalties: UserPenalty[];
}
