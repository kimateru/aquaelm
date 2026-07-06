import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children, mainClassName = "" }) {
  return (
    <div className="page-shell">
      <Navbar />
      <main className={`page-main ${mainClassName}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}
