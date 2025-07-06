export const Toast = ({ toasts }) =>{
    return(
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 999999999999999 }}>
            {toasts.map((toast, i) => (
                <div className={`toast show text-white bg-${toast.type} border-0 mb-2`} role="alert" key={i} >
                    <div className="d-flex">
                        <div className="toast-body">{toast.message}</div>
                        <button onClick={()=>toast.remove()} className="btn-close btn-close-white me-2 m-auto" type="button"></button>
                    </div>
                </div>
            ))}
        </div>
    )
}
