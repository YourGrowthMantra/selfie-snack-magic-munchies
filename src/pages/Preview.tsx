
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Cake, Utensils, ShoppingBag, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import OrderModal from "@/components/OrderModal";

const Preview = () => {
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState("cupcake");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Food background images
  const foodBackgrounds = {
    cupcake: "https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coffee: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  };

  useEffect(() => {
    // Retrieve selfie from localStorage
    const savedImage = localStorage.getItem('selfieImage');
    
    if (savedImage) {
      setSelfieImage(savedImage);
    } else {
      // Redirect to upload if no image is found
      toast({
        title: "No selfie found",
        description: "Please upload a selfie first",
        variant: "destructive"
      });
      navigate('/upload');
    }
  }, [navigate, toast]);

  const handlePlaceOrder = () => {
    setIsOrderModalOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-2" 
              onClick={() => navigate('/upload')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
              Preview Your <span className="text-primary">SelfieSnack</span>
            </h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            See how your selfie will look on different food options and pick your favorite!
          </p>
          
          <Tabs defaultValue="cupcake" onValueChange={setSelectedFood} className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="cupcake" className="data-[state=active]:bg-snack-pink data-[state=active]:text-primary">
                <Cake className="h-4 w-4 mr-2" />
                Cupcake
              </TabsTrigger>
              <TabsTrigger value="coffee" className="data-[state=active]:bg-snack-yellow data-[state=active]:text-snack-orange">
                <Coffee className="h-4 w-4 mr-2" />
                Coffee
              </TabsTrigger>
              <TabsTrigger value="sushi" className="data-[state=active]:bg-snack-blue data-[state=active]:text-blue-600">
                <Utensils className="h-4 w-4 mr-2" />
                Sushi
              </TabsTrigger>
            </TabsList>
            
            {selfieImage && (
              <>
                <TabsContent value="cupcake" className="mt-0">
                  <FoodPreview
                    foodImage={foodBackgrounds.cupcake}
                    selfieImage={selfieImage}
                    foodName="Cupcake"
                    description="Your face on a delicious vanilla cupcake with buttercream frosting."
                    price="$12.99"
                    color="snack-pink"
                  />
                </TabsContent>
                <TabsContent value="coffee" className="mt-0">
                  <FoodPreview
                    foodImage={foodBackgrounds.coffee}
                    selfieImage={selfieImage}
                    foodName="Coffee"
                    description="Your selfie printed on creamy coffee foam - the perfect Instagram moment."
                    price="$8.99"
                    color="snack-yellow"
                  />
                </TabsContent>
                <TabsContent value="sushi" className="mt-0">
                  <FoodPreview
                    foodImage={foodBackgrounds.sushi}
                    selfieImage={selfieImage}
                    foodName="Sushi Roll"
                    description="Your face on a California roll - uniquely delicious and totally you!"
                    price="$15.99"
                    color="snack-blue"
                  />
                </TabsContent>
              </>
            )}
          </Tabs>
          
          <div className="flex justify-center">
            <Button 
              onClick={handlePlaceOrder}
              className="button-hover bg-primary hover:bg-primary/90"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Place Your Order
            </Button>
          </div>

          <OrderModal 
            open={isOrderModalOpen} 
            onOpenChange={setIsOrderModalOpen} 
            selectedFood={selectedFood}
          />
        </div>
      </div>
    </Layout>
  );
};

interface FoodPreviewProps {
  foodImage: string;
  selfieImage: string;
  foodName: string;
  description: string;
  price: string;
  color: string;
}

const FoodPreview = ({ foodImage, selfieImage, foodName, description, price, color }: FoodPreviewProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${foodImage})` }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This is where we'd overlay the selfie on the food in a real implementation */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={selfieImage} 
                  alt="Your selfie"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-display font-bold mb-2 text-gray-800">
              Selfie {foodName}
            </h3>
            <p className="text-gray-600 mb-4">
              {description}
            </p>
            <div className={`inline-block px-3 py-1 rounded-full bg-${color} text-gray-800 font-medium mb-4`}>
              {price}
            </div>
            <ul className="text-sm text-gray-600 mb-4">
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                FDA-approved edible ink
              </li>
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Made fresh to order
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Delivery within 48 hours
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Preview;
