import Homepage from "./landing/Homepage";
import Footer from "./Footer";
import Header from "./Header";
import "../styles.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}
