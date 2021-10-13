import Homepage from "./landing/Homepage";
import Footer from "./Footer";
import Header from "./Header";
import "../styles.css";
import alignWords from "@digitallinguistics/word-aligner";
import "../css/Footer.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}
