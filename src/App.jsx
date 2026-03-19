import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";
import Home from "./pages/Home";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      
      <GlobalStyle />

      <Home toggleTheme={toggleTheme} darkMode={darkMode} />

    </ThemeProvider>
  );
}

export default App;