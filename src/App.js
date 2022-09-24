import RegisterPage from "./Pages/RegisterPage";
import { Container } from "react-bootstrap";
import "./App.css"

export default function App() {
  return (
    
    <Container className="d-flex align-item-center 
    justify-content-center" 
    style={{minHeight: "100vh"}}>
    <div className="w-100" style={{ maxWidth: "400px"}}>

    <RegisterPage/>
    </div>
    </Container>
    
  );
}
