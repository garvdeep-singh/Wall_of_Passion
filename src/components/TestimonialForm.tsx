import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function TestimonialForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const existingTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
      const updatedTestimonials = [...existingTestimonials, testimonial];
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));

      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted successfully.",
      });

      // Simulate a brief delay for better UX
      setTimeout(() => {
        navigate('/display');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card backdrop-blur-sm shadow-soft border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Share Your Experience
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          We'd love to hear about your experience. Your feedback helps us improve!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Your Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell us about your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-glow"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}