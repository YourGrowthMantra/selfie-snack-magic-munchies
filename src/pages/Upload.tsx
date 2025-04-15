
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Upload as UploadIcon, Image, X } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Upload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImage(e.target.result);
        
        // Store in localStorage for use in preview
        localStorage.setItem('selfieImage', e.target.result);
        
        toast({
          title: "Image uploaded!",
          description: "Your selfie is ready for preview.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    localStorage.removeItem('selfieImage');
  };

  const proceedToPreview = () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload a selfie first",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsUploading(false);
      navigate('/preview');
    }, 1000);
  };

  // Check if image is in localStorage on mount
  useState(() => {
    const savedImage = localStorage.getItem('selfieImage');
    if (savedImage) {
      setImage(savedImage);
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-center text-gray-800">
            Upload Your <span className="text-primary">Selfie</span>
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Drag and drop your photo or select a file to create your edible masterpiece
          </p>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              {!image ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
                    isDragging ? 'border-primary bg-snack-pink/20' : 'border-gray-300 hover:border-primary hover:bg-snack-yellow/10'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="mx-auto w-20 h-20 bg-snack-yellow rounded-full flex items-center justify-center mb-4">
                    <UploadIcon className="h-10 w-10 text-snack-orange" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-800">
                    {isDragging ? "Drop your image here" : "Drop your image here or click to browse"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports JPG, PNG (max 5MB)
                  </p>
                  <Button variant="outline" className="button-hover">
                    <Image className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleFileInput}
                    ref={fileInputRef}
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="rounded-full w-8 h-8 button-hover"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={image} 
                      alt="Uploaded selfie" 
                      className="w-full max-h-96 object-contain"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              onClick={proceedToPreview} 
              disabled={!image || isUploading}
              className="button-hover bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isUploading ? "Processing..." : "Continue to Preview"}
              {!isUploading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
