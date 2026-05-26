import { GroupCreation, GroupDTO } from "@/lib/types/group";

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
    throw new Error("Failed to create group");
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
    throw new Error("Failed to get group");
  }

  return response.json();
}
