import { FiAlertTriangle, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Unauthorized = () =>{
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light p-4">
            <div className="text-center mb-4">
                <FiAlertTriangle className="text-warning mb-3" size={64} />
                <h2 className="fw-bold">Access Denied</h2>
                <p>You don’t have permission to view this page.</p>
            </div>

            <div className="card bg-secondary rounded-4 border border-lightly p-4 w-100" style={{ maxWidth: 400 }}>
                <p className="mb-4 text-light">If you believe this is an error, please contact your administrator.</p>
                <button onClick={()=>navigate('/home')} className="btn btn-outline-lightly w-100"><FiHome className="me-2" />Go to Home</button>
            </div>
        </div>
    );
}
