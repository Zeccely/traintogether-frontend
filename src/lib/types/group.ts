export type GroupCreation = {
  groupName: string;
};

export type GroupJoin = {
  groupId: number;
};

export type GroupDTO = {
  id: number;
  groupName: string;
};

export type GroupUserDTO = {
  username: string;
  name: string;
  groupId?: number;
  goalId?: number;
};
