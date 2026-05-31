import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeDTO } from "@/lib/types/stake";

type MyStakeProps = {
  stake: StakeDTO;
};

export default function MyStake({ stake }: MyStakeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Group&apos;s Stake</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{stake.description}</p>
      </CardContent>
    </Card>
  );
}
