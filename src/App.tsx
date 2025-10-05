import { BrowserRouter, Route, Routes } from 'react-router';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Topics from './pages';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Topics />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
