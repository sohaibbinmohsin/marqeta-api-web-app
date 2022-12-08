import './App.css';
import { BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { SignUp, SignIn, Wallet, Transactions, Profile, Landing} from '.';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
