import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im"; // Import spinner icon

const PageTransition = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 700); // Adjust duration if needed
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <div className="relative">
      {/* Always render children */}
      {children}

      {/* Show loading effect when loading is true */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="admin-transition"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <ImSpinner2 className="text-blue-500 text-6xl animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
