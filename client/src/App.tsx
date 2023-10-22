import AppProvider from "./providers";
import AppRoutes from "./routes";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
