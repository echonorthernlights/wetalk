import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      {/* <main className="py-3">
        <Container> */}
      <Outlet />
      {/* </Container>
      </main> */}
      {/* <Footer />
      <ToastContainer /> */}
    </>
  );
}

export default App;
