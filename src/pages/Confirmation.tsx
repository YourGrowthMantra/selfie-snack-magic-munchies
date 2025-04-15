
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowLeft, Home } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface OrderDetails {
  name: string;
  email: string;
  product: string;
  date: string;
}

const Confirmation = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const orderData = localStorage.getItem('orderDetails');
    
    if (orderData) {
      setOrderDetails(JSON.parse(orderData));
    } else {
      // Redirect if no order details found
      navigate('/');
    }
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!orderDetails) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-800">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your SelfieSnack order. We're preparing your delicious edible selfie!
          </p>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{orderDetails.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{orderDetails.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-medium">{orderDetails.product}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{formatDate(orderDetails.date)}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-snack-green/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>What's next?</strong> We'll send an email confirmation to {orderDetails.email} with delivery details. Your edible selfie will be delivered within 2-3 business days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="button-hover"
              onClick={() => navigate('/upload')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create Another
            </Button>
            
            <Link to="/">
              <Button className="button-hover bg-primary hover:bg-primary/90">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
