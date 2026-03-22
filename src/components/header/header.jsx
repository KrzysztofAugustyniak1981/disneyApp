import { HeaderWrapper } from "./styles";

const Header = ({ toggleTheme }) => {
  return (
    <HeaderWrapper>
      <button onClick={toggleTheme}>Change theme</button>
    </HeaderWrapper>
  );
};

export default Header;