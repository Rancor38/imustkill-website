import Container from "./Container";
import { Link } from "react-router-dom";
const DownloadCharacterSheetButton = () => {
    return (
        <div className="home-button-container">
        <Container>
            <div className="download-menu-spacinator">
            <Link to="/">Go to Home</Link>
        <button className='home-button' href={`${process.env.PUBLIC_URL}/IMK Character Sheet.pdf`} download>
        Download PDF
      </button>
            </div>
        </Container>
        </div>
    );
};

export default DownloadCharacterSheetButton;