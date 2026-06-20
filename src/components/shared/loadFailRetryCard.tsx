import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type LoadFailRetryCardProps = {
  message: string;
  onRetry: () => void;
};

export default function LoadFailRetryCard({ message, onRetry }: LoadFailRetryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Something went wrong</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-destructive">{message}</p>
        <Button asChild className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
