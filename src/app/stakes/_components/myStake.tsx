import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeDTO } from "@/lib/types/stake";

type MyStakeProps = {
  stake: StakeDTO;
  groupName: string | null;
};

export default function MyStake({ stake, groupName }: MyStakeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{groupName ? `${groupName}'s Stake` : "Group Stake"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{stake.description}</p>
      </CardContent>
    </Card>
  );
}
