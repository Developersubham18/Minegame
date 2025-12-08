import "./App.css";
import Main from "./components/Main";

function App() {
  return (
    <div className="App ">
      <Main />
      <footer className="flex justify-center items-center w-[100%] md:mx-auto  bottom-1 max-w-[1200px] ">
        {" "}
        <h1 className="font-semibold text-xl text-white">
          Made by{" "}
          <a
            className="ml-2 underline text-primary "
            href="https://ashish4.vercel.app"
            target="_blank"
          >
            Ashish
          </a>
              & deployed by Suzziea
        </h1>
      </footer>
    </div>
  );
}

export default App;
