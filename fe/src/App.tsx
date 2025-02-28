import { BrowserRouter } from "react-router-dom"
import AppRouter from "~/routes"
import { GlobalDataProvider } from "~/hooks/globalData";

function App() {

  return (
    <>
      <BrowserRouter>
        <GlobalDataProvider>
          <AppRouter />
        </GlobalDataProvider>
      </BrowserRouter>
    </>

  )
}

export default App
