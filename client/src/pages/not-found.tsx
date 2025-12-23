import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-4 border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">404 Not Found</h1>
          </div>

          <p className="mt-4 text-muted-foreground">
            The requested signal frequency does not exist within this sector.
          </p>

          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline font-mono">
              Return to Mission Control
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
