import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

function App()
  {
    return (
      <>
        <Header />
        <main className="site-main">
          <Hero />
        </main>
      </>
    );
  }

export default App;
