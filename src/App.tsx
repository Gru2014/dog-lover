import{ Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Header, Login, Search } from './components'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
