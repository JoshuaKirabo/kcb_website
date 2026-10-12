import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Stats } from "./components/Stats/Stats";

function App()
  {
    return (
      <>
        <Header />
        <main className="site-main">
          <Hero />
          <About />
          <Stats />
        </main>
      </>
    );
  }

export default App;
