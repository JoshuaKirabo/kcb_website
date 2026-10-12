import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";

function App()
  {
    return (
      <>
        <Header />
        <main className="site-main">
          <Hero />
          <About />
        </main>
      </>
    );
  }

export default App;
