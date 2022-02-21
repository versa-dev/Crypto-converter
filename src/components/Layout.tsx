import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: ReactNode;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060f38;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWapper = styled(Wrapper)`
  height: 200px;
`;

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Container>
      <HeaderWapper>
        <img src="/images/logo.png" alt="neptune-logo" height={80} />
      </HeaderWapper>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
