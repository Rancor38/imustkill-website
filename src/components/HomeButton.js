import Container from "./Container";
import { Link } from "react-router-dom";

const HomeButton = () => {
    return (
        <div className="home-button-container">
        <Container>
            <Link to="/">Go to Home</Link>
        </Container>
        </div>
    );
};

export default HomeButton;