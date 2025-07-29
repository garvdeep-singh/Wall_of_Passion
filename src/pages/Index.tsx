import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TestimonialForm from '@/components/TestimonialForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Wall of Passion
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your experience and help others discover what makes us special. Your voice matters!
          </p>
          
          <Button asChild variant="outline" className="mb-8">
            <Link to="/display">View All Testimonials</Link>
          </Button>
        </div>
        
        <TestimonialForm />
      </div>
    </div>
  );
};

export default Index;
