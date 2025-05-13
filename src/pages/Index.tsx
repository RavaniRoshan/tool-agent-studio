
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page
    navigate('/');
  }, [navigate]);

  return null; // Component doesn't render anything as it immediately redirects
};

export default Index;
