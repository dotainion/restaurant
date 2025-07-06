import { IoMdClose } from "react-icons/io";

export const OverlayModal = ({show, title, close, children}) =>{
    if(!show) return null;
    return(
        <div onClick={close} className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50" style={{zIndex: '999999999'}}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div onClick={e=>e.stopPropagation()} className="card border border-lightly shadow-lg">
                    <div className="card-body overflow-auto modal-overlay">
                        <div className="d-flex justify-content-between">
                            <h5 className="text-orange m-0 p-0">{title}</h5>
                            <button onClick={close} className="btn text-orange p-0 ">
                                <IoMdClose className="fs-3"/>
                            </button>
                        </div>
                        <hr></hr>
                        <div className="children">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}