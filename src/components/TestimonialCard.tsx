import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  headline: string;
  message: string;
  timestamp: string;
  index: number;
}

export default function TestimonialCard({ name, message, timestamp, index }: TestimonialCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Card 
      className="bg-gradient-card backdrop-blur-sm shadow-soft border-0 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <blockquote className="text-foreground text-base leading-relaxed">
            "{message}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="font-semibold text-primary not-italic">
                — {name}
              </cite>
            </div>
            <time className="text-sm text-muted-foreground">
              {formatDate(timestamp)}
            </time>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}