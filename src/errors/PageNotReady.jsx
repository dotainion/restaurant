import { BsTools } from "react-icons/bs"

export const PageNotReady = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '75vh' }}>
            <BsTools className="mb-3" size={64} color="#6c757d" />
            <h2 className="text-light mb-2">This Page Isn’t Ready Yet</h2>
            <p className="text-secondary fs-5">
                We're still working on this section. It will be available soon.
            </p>
        </div>
    )
}