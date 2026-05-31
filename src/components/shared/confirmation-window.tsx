import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ConfirmationWindowProps = {
  isOpen: boolean;
  title: string;
  message: string;
  isPending?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationWindow({
  isOpen,
  title,
  message,
  isPending = false,
  cancelLabel = "Cancel",
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: ConfirmationWindowProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <Card className="w-full max-w-sm bg-background">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" disabled={isPending} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button type="button" variant="destructive" disabled={isPending} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
