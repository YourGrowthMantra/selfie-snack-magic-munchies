
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Upload, Coffee, Smile } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    setAnimationLoaded(true);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`transition-all duration-1000 ${animationLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-gray-800">
              Turn Your <span className="text-primary">Selfie</span> Into <span className="text-accent">Edible Art</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Upload your photo, preview it on delicious treats, and order a tasty 
              memento that's as unique as you are!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/upload">
                <Button size="lg" className="w-full sm:w-auto button-hover bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/preview">
                <Button variant="outline" size="lg" className="w-full sm:w-auto button-hover border-accent text-accent hover:bg-accent hover:text-white">
                  See Examples
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`flex justify-center transition-all duration-1000 delay-300 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute top-4 left-4 w-40 h-40 bg-snack-pink rounded-lg rotate-3 animate-float"></div>
              <div className="absolute top-20 left-20 w-48 h-48 bg-snack-yellow rounded-lg -rotate-6 animate-float animation-delay-300"></div>
              <div className="absolute top-12 left-12 w-56 h-56 bg-snack-purple rounded-lg rotate-12 animate-float animation-delay-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-snack-pink-bright to-snack-purple-bright flex items-center justify-center">
                    <Camera className="w-20 h-20 text-white animate-pulse-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 md:mt-32">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gray-800">
            How It <span className="text-primary">Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Upload className="h-10 w-10 text-primary" />}
              title="Upload Your Selfie"
              description="Take your best shot and upload it to our secure platform."
              delay="0"
            />
            <FeatureCard 
              icon={<Coffee className="h-10 w-10 text-primary" />}
              title="Preview on Foods"
              description="See your face on a cupcake, coffee foam, or sushi roll."
              delay="200"
            />
            <FeatureCard 
              icon={<Smile className="h-10 w-10 text-primary" />}
              title="Enjoy Your Creation"
              description="Place your order and enjoy your edible selfie treat!"
              delay="400"
            />
          </div>
        </div>
        
        <div className="mt-20 md:mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-800">
            Ready to <span className="text-primary">Create</span> Your Edible Selfie?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of food lovers who have already turned their faces into delicious treats!
          </p>
          <Link to="/upload">
            <Button size="lg" className="button-hover bg-primary hover:bg-primary/90">
              Upload Your Selfie Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 mx-auto bg-snack-pink rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold text-center mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Index;
