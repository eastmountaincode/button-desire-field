import MainHeader from "./components/MainHeader";
import AddNewEntry from "./components/AddEntry/AddNewEntry";

function App() {
  return (
    <div className="min-h-screen text-black">
    <div>
      <MainHeader />
    </div>
    <AddNewEntry />
    </div>
  )
}

export default App
