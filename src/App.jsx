import { useRef } from 'react';
import MainHeader from "./components/MainHeader";
import AddNewEntry from "./components/AddEntry/AddNewEntry";
import ButtonField from "./components/ButtonField";

function App() {
  const refetchButtonsRef = useRef();
  return (
    <div className="min-h-screen text-black p-2">
      <div>
        <MainHeader />
      </div>
      <AddNewEntry onSuccess={() => refetchButtonsRef.current?.()} />
      <ButtonField onRefetch={refetchButtonsRef} />
    </div>
  )
}

export default App
