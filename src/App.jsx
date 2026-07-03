import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<Shop />} />
        <Route path="/pages/about-us" element={<OurStory />} />
        <Route path="/pages/contact-us" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
