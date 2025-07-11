import { Toaster } from "sonner";
import { AppRoutes } from './routes/Routes';
import './App.css';

export const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" richColors /> 
    </>
  );
};
