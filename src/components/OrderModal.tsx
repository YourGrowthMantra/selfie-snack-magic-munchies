
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFood: string;
}

const OrderModal = ({ open, onOpenChange, selectedFood }: OrderModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Save order details
      localStorage.setItem('orderDetails', JSON.stringify({
        name,
        email,
        address,
        product: `Selfie ${selectedFood.charAt(0).toUpperCase() + selectedFood.slice(1)}`,
        date: new Date().toISOString(),
      }));
      
      // Automatically redirect after showing success
      setTimeout(() => {
        onOpenChange(false);
        navigate('/confirmation');
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Enter your details to place your SelfieSnack order
          </DialogDescription>
        </DialogHeader>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter your full address"
                required
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full button-hover bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Order"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Order Submitted!</h3>
            <p className="text-sm text-gray-500 mb-4">
              Thank you for your order. You'll be redirected to the confirmation page.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
