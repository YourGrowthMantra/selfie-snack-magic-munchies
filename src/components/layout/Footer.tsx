
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-display font-bold text-gray-800">SelfieSnack</h3>
            <p className="text-sm text-gray-500 mt-1">Edible selfies for your favorite treats!</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">Upload Selfie</Link>
            <Link to="/preview" className="text-gray-600 hover:text-primary transition-colors">Preview</Link>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SelfieSnack. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for food lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
