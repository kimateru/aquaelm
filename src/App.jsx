import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LenisProvider, useLenis } from "./context/LenisContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

function ScrollToTop() {
  const location = useLocation();
  const { lenis } = useLenis() ?? {};

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, lenis]);

  return null;
}

function App() {
  return (
    <LenisProvider>
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
    </LenisProvider>
  );
}

export default App;
