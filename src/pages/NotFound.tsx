
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-display font-bold mb-4 text-gray-800">Oops! Snack Not Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Link to="/">
            <Button className="button-hover bg-primary hover:bg-primary/90">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
