import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center text-light" style={{ height: '75vh' }}>
            <BiErrorCircle className="mb-4" size={80} />
            <h1 className="mb-2">404 - Page Not Found</h1>
            <p className="fs-5 mb-4">The page you're looking for doesn't exist or has been moved.</p>
            <button className="btn btn-outline-light" onClick={() => navigate('/')}>Go Back Home</button>
        </div>
    )
}

