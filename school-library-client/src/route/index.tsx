import { BrowserRouter, Route, Routes } from 'react-router';
import { Slide, ToastContainer } from 'react-toastify';

import { Dashboard, NotFound, ServiceUnavailable, SignIn, SignUp } from 'pages';
import PublicRoute from 'route/PublicRoute.tsx';

import PrivateRoute from './PrivateRoute.tsx';

const App = () => {
  return (
    <main className="font-inter-regular">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="/service-unavailable" element={<ServiceUnavailable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </main>
  );
};

export default App;
