import { useEffect, useState } from "react";
import { MessageBuilder } from "../components/MessageBuilder"
import { utils } from "../utils/Utils"
import { IoPeopleOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { api } from "../request/Api";
import { Spinner } from "../widgets/Spinner";
import { useAuth } from "../providers/AuthProvider";

export const Messaging = () =>{
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [messanger, setMessanger] = useState();
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.user.users().then((response)=>{
            setUsers(response.data.data.filter((u)=>user.id !== u.id));
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <div className="d-md-flex vh-100">
            <div className={`position-relative ${showMessage ? '' : 'd-none d-md-block'}`}>
                <div className="messangers d-flex flex-column border-end border-lightly overflow-hidden vh-100">
                    <div className="bg-darker border-bottom border-lightly text-light px-3 py-2">Messanger</div>
                    <div className="p-3">
                        <input className="bg-darker border border-lightly form-control shadow-none text-light w-100" placeholder="Search..."/>
                    </div>
                    <div className="position-relative overflow-auto scrollbar-md">
                        {
                            users.length ?
                            users.map((user, key)=>(
                                <div onClick={()=>setMessanger(user)} className="btn btn-dark rounded-0 text-start d-flex gap-2 pointer overflow-hidden px-3 my-3" key={key}>
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            minWidth: '50px',
                                            minHeight: '50px',
                                            maxWidth: '50px',
                                            maxHeight: '50px',
                                            backgroundColor: utils.randomColor()
                                        }}
                                    >{user.attributes.firstName?.[0]}</div>
                                    <div>
                                        <div className="fw-bold">{user.attributes.firstName} {user.attributes.lastName}</div>
                                        <div className="small text-secondary text-truncate">{user.attributes.role?.attributes?.role}</div>
                                    </div>
                                </div>
                            )):
                            <div className="p-3">
                                <div className="text-center p-3 border border-lightly rounded-4 bg-darker">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                                        alt="No users"
                                        style={{width: "50px", height: "50px", opacity: 0.5}}
                                        className="mb-3"
                                    />
                                    <h5 className="fw-semibold mb-2">No Contacts Yet</h5>
                                    <p className="small mb-0">Your user list is empty. Start a conversation once users join or become available.</p>
                                </div>
                            </div>
                        }
                        <Spinner show={loading} sm inline />
                    </div>
                </div>
                <div className="d-md-none d-block position-absolute end-0 bottom-0 me-3" style={{zIndex: '9999999999', marginBottom: '140px'}}>
                    <button onClick={()=>setShowMessage(false)} className="btn btn-orange bg-opacity-75 btn-lg rounded-circle">
                        <LuMessageCircleMore/>
                    </button>
                </div>
            </div>
            <div className={`flex-fill position-relative ${showMessage ? 'd-none d-md-block' : ''}`}>
                {
                    messanger
                    ? <div className="">
                        <MessageBuilder 
                            messageToName=""
                            pusherEvent={{
                                channel: 'channel',//todo: need channel and event/ event probably correct
                                event: 'message'
                            }}
                            onNewMessage={(content)=>null}
                            onEditMessage={(message, cb)=>null}
                        />
                        <div className="d-md-none d-block position-absolute end-0 bottom-0 me-3" style={{zIndex: '9999999999', marginBottom: '140px'}}>
                            <button onClick={()=>setShowMessage(true)} className="btn btn-orange bg-opacity-75 btn-lg rounded-circle">
                                <IoPeopleOutline/>
                            </button>
                        </div>
                    </div>
                    : <div className="position-relative d-flex align-items-center justify-content-center vh-100">
                        <div className="text-center p-3">
                            <LuMessageCircleMore className="display-1"/>
                            <div className="h4 my-3">To start messaging</div>
                            <div className="text-secondary">Select a contact from the list to view or start a conversation.</div>
                            <div className="text-secondary">Your messages will appear here once a chat is selected.</div>
                        </div>
                        <div className="d-md-none d-block position-absolute end-0 bottom-0 me-3" style={{zIndex: '9999999999', marginBottom: '140px'}}>
                            <button onClick={()=>setShowMessage(true)} className="btn btn-orange bg-opacity-75 btn-lg rounded-circle">
                                <IoPeopleOutline/>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}