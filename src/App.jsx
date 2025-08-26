import MainHeader from "./components/MainHeader";
import AddNewEntry from "./components/AddEntry/AddNewEntry";

function App() {
  return (
    <div className="min-h-screen bg-blue-500 border-2 border-red-500 text-black">
    <div className="mb-4">
      <MainHeader />
    </div>
    <AddNewEntry />
    </div>
  )
}

export default App
