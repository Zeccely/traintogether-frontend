import { StakeAdding, StakeDTO } from "@/lib/types/stake";

export async function getMyGroupStake(): Promise<StakeDTO> {
  const response = await fetch("/api/stakes/my-group", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updateMyGroupStake(input: StakeAdding): Promise<StakeDTO> {
  const response = await fetch("/api/stakes/my-group", {
    method: "PUT",
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
