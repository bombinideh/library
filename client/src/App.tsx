import StylesProvider from "./providers/StylesProvider";
import AppRoutes from "./routes";

export default function App() {
  return (
    <StylesProvider>
      <AppRoutes />
    </StylesProvider>
  );
}
