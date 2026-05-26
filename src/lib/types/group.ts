export type GroupCreation = {
  groupName: string;
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
