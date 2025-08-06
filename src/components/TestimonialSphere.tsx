import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  headline: string;
  message: string;
  timestamp: string;
}

export default function InfiniteTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("testimonials") || "[]");
    setTestimonials(data);
  }, []);

  if (!testimonials.length) {
    return <div className="text-center py-16 text-primary">No testimonials yet.</div>;
  }

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-8">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="inline-block align-top bg-white/80 border border-primary rounded-lg shadow-md mx-4 px-6 py-4 min-w-[300px] max-w-xs"
        >
          <div className="text-primary font-semibold mb-2">{t.name}</div>
          <div className="text-foreground">{t.message}</div>
        </div>
      ))}
    </div>
  );
}