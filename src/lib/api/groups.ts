import { GroupCreation, GroupDTO, GroupUserDTO } from "@/lib/types/group";

export async function createGroup(input: GroupCreation): Promise<GroupDTO> {
  const response = await fetch("/api/groups", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function getMyGroup(): Promise<GroupDTO | null> {
  const response = await fetch("/api/groups/my-group", {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function getGroups(): Promise<GroupDTO[]> {
  const response = await fetch("/api/groups", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function joinGroup(groupId: number): Promise<GroupDTO> {
  const response = await fetch(`/api/groups/${groupId}/join`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function leaveGroup(): Promise<void> {
  const response = await fetch("/api/groups/my-group", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to leave group");
  }
}

export async function getMyGroupUsers(): Promise<GroupUserDTO[]> {
  const response = await fetch("/api/groups/my-group/users", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get group users");
  }

  return response.json();
}
