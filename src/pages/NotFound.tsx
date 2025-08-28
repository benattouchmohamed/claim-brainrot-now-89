import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="blocky-bg rounded-3xl p-8">
          <div className="text-6xl font-fredoka-one mb-4 text-primary">404</div>
          <h1 className="text-2xl font-bold mb-4 item-title-glow">Brainrot Not Found!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Oops! This brainrot doesn't exist in our collection.
          </p>
          <a 
            href="/" 
            className="claim-pill inline-flex items-center gap-2 no-underline"
          >
            <Home size={20} />
            Return to Claim Brainrot
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
