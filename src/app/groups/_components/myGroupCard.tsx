"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupDTO } from "@/lib/types/group";

type MyGroupCardProps = {
  group: GroupDTO;
};

export default function MyGroupCard({ group }: MyGroupCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.groupName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Group ID: {group.id}</p>
      </CardContent>
    </Card>
  );
}
