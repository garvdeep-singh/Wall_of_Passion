import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import TestimonialCard from '@/components/TestimonialCard';
import FlipCard from '@/components/FlipCard';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  name: string;
  headline: string;
  message: string;
  timestamp: string;
  photoUrl: string;
}

export default function Display() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedTestimonials = localStorage.getItem('testimonials');
      if (storedTestimonials) {
        const parsed = JSON.parse(storedTestimonials);
        // Sort by timestamp, newest first
        const sorted = parsed.sort((a: Testimonial, b: Testimonial) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setTestimonials(sorted);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleClearAll = () => {
    try {
      localStorage.removeItem('testimonials');
      setTestimonials([]);
      toast({
        title: "Cleared!",
        description: "All testimonials have been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear testimonials.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent text-[#6f9262]">
            Passion Stories
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-[#6f9262]">
            Discover what our amazing colleagues have to say about their experiences with us.
          </p>
          
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center opacity-20">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">No testimonials yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to share your experience! Your feedback helps us improve and inspires others.
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-soft hover:shadow-glow transition-all duration-300">
                <Link to="/">Write First Testimonial</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <FlipCard
                key={testimonial.id}
                name={testimonial.name}
                headline={testimonial.headline}
                message={testimonial.message}
                timestamp={testimonial.timestamp}
                photoUrl={testimonial.photoUrl}
                showHint={idx === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}