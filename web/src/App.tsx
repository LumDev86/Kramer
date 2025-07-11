import { Toaster } from "sonner";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppRoutes } from './routes/Routes';
import './App.css';

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      <Toaster position="top-center" richColors /> 
    </>
  );
};
