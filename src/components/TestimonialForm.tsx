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
  headline: string;
  message: string;
  timestamp: string;
  photoUrl?: string; // new field
}

export default function TestimonialForm() {
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
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
        headline: headline.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        photoUrl, // new field
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card backdrop-blur-sm shadow-soft border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Share Your Passion Story
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          We'd love to hear about your experience. Your feedback helps us improve!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Your Name
            </label>
            {/* <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
              disabled={isSubmitting}
            /> */}

            <Input
  id="name"
  type="text"
  placeholder="Enter your full name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  maxLength={35}
  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
  disabled={isSubmitting}
/>
<p className="text-xs text-muted-foreground text-right mt-1">
  {name.length}/35 characters
</p>
          </div>
          {/* Headline */}
          <div className="space-y-2">
            <label htmlFor="headline" className="text-sm font-medium text-foreground">
              Your Headline
            </label>
            {/* <Input
              id="headline"
              type="text"
              placeholder="e.g. Working Professional, Psychology Student, Artist etc."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
              disabled={isSubmitting}
            /> */}
            <Input
  id="headline"
  type="text"
  placeholder="e.g. Working Professional, Psychology Student, Artist etc."
  value={headline}
  onChange={(e) => setHeadline(e.target.value)}
  maxLength={25}
  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
  disabled={isSubmitting}
/>
<p className="text-xs text-muted-foreground text-right mt-1">
  {headline.length}/25 characters
</p>
          </div>
          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Your Story
            </label>
            <Textarea
  id="message"
  placeholder="How has ikipendence helped you in living your passion?"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  maxLength={400}
  className="w-full min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:shadow-glow"
  disabled={isSubmitting}
/>
<p className="text-xs text-muted-foreground text-right mt-1">
  {message.length}/400 characters
</p>
          </div>
          {/* Photo Upload */}
          <div className="space-y-2">
            <label htmlFor="photo" className="text-sm font-medium text-foreground">
              Upload Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
              disabled={isSubmitting}
            />
            {photoUrl && (
              <img src={photoUrl} alt="Preview" className="h-16 w-16 rounded-full mt-2 object-cover" />
            )}
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




