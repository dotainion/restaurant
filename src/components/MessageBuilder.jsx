import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { BiReset } from "react-icons/bi";
import { useAuth } from "../providers/AuthProvider";
import { utils } from "../utils/Utils";
import EmojiConvertor from 'emoji-js';

export const MessageBuilder = ({messageToName, messages, onNewMessage, onEditMessage, asHtml, pusherEvent}) =>{
    const [messageList, setMessageList] = useState([]);

    const navigate = useNavigate();

    const editorRef = useRef();

    const parseEmojis = (content) => {
        const emoji = new EmojiConvertor();
        emoji.replace_mode = 'unified';
        emoji.allow_native = true;
        emoji.include_title = false;
        emoji.allow_caps = true;
        emoji.use_emoticon = true;
        return emoji.replace_emoticons(content);
    }

    const onTyping = () => {
        const selection = window.getSelection();
        const range = selection && selection.getRangeAt && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : null;

        const currentHtml = editorRef.current.innerHTML;
        const newHtml = parseEmojis(currentHtml);

        if (currentHtml !== newHtml) {
            editorRef.current.innerHTML = newHtml;

            setTimeout(() => {
                if(!range) return;
                selection.removeAllRanges();
                selection.addRange(range);
            }, 0);
        }
    }

    const onChange = () =>{
        const content = asHtml ? editorRef.current.innerHTML : editorRef.current.innerText;
        if(!content) return;
        asHtml ? editorRef.current.innerHTML = '' : editorRef.current.innerText = '';
        onNewMessage?.(content);
    }

    const updateMessage = (message, cb) =>{
        const data = {
            ...message,
            ...message.attributes,
            ...pusherEvent,
            read: true
        }
        onEditMessage?.(data, cb);
    }

    const injectDateDividers = (filteredMessages) =>{
        const result = [];
        let lastDate = null;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
      
        const getDateLabel = (dateString) =>{
            const msgDate = new Date(dateString);
            const dateOnly = msgDate.toISOString().split('T')[0];

            const todayStr = today.toISOString().split('T')[0];
            const yesterdayStr = yesterday.toISOString().split('T')[0];
        
            if (dateOnly === todayStr) return 'Today';
            if (dateOnly === yesterdayStr) return 'Yesterday';
        
            const diffInDays = Math.floor((today - msgDate) / (1000 * 60 * 60 * 24));
            if (diffInDays < 7 && diffInDays > 1) {
                return msgDate.toLocaleDateString('en-US', { weekday: 'long' });
            }
            return dateOnly;
        }
      
        for (const msg of filteredMessages) {
            const fullDate = msg.attributes.date;
            const dateOnly = fullDate.split(' ')[0];
            if (dateOnly !== lastDate) {
                result.push({dateStart: getDateLabel(fullDate), id: uuidv4()});
                lastDate = dateOnly;
            }
            result.push(msg);
        }
        return result;
    }

    useEffect(()=>{
        if(!messages?.length) return;
        let lastSenderId = null;
        const sortAndMapMessages = messages.sort((a, b)=>new Date(a.attributes.date) - new Date(b.attributes.date)).map((msg)=>{
            const showSenderName = msg.attributes.fromId !== lastSenderId;
            lastSenderId = msg.attributes.fromId;
            return {...msg, showSenderName}
        });
        setMessageList(injectDateDividers(sortAndMapMessages));
    }, [messages]);

    return(
        <div className="d-flex justify-content-center vh-100">
            <div className="flex-fill" style={{maxWidth: '700px'}}>
                <div className="d-flex flex-column vh-100 bg-dark">
                    <div className="d-flex gap-2 border-bottom border-lightly p-3">
                        <button onClick={()=>navigate(-1)} className="btn bg-transparent p-0 border-0 shadow-none">
                            <MdArrowBackIos className="text-dark"/>
                        </button>
                        <span className="fw-bold">{messageToName}</span>
                    </div>

                    <div className="flex-fill overflow-auto scrollbar-hidden p-2 small h-100">
                        {messageList.map((msg)=>(
                            <Fragment key={msg.id}>
                                {
                                    msg.dateStart
                                    ? <div className="text-center p-2">
                                        <span className="bg-primary bg-opacity-10 px-2 py-1 rounded-3">{msg.dateStart}</span>
                                    </div>
                                    : <Message 
                                        msg={msg} 
                                        onUpdate={updateMessage}
                                    />
                                }
                            </Fragment>
                        ))}
                    </div>

                    <div className="bg-darker d-flex align-items-center gap-2 rounded-top-4 p-3">
                        <div
                            ref={editorRef}
                            contentEditable
                            onInput={onTyping}
                            className="editable bg-darker form-control shadow-none text-light border-0 flex-fill"
                            role="textbox"
                            aria-label="editor"
                            data-placeholder="Type a message..."
                            suppressContentEditableWarning
                            style={{minHeight: '40px'}}
                        />
                        <button onClick={onChange} className="btn border-0 shadow-none bg-transparent p-0">
                            <MdSend className="text-secondary fs-3"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Message = ({msg, onUpdate}) =>{
    const { user } = useAuth();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const messageRef = useRef();

    class Callback{
        constructor(observer=null){
            this.observer = observer;
            setLoading(true);
        }
        success = () =>{
            setError(false);
            if(!messageRef.current) return;
            this.observer?.unobserve?.(messageRef.current);
        }
        unsuccess = () =>setError(true);
        finall = () =>setLoading(false);
    }

    const update = () =>{
        onUpdate(msg, new Callback());
    }

    useEffect(()=>{
        if(!msg.unsuccess || msg.id !== user.id) return;
        setError(true);
    }, [msg]);

    useEffect(()=>{
        if(msg.id === user.id) return;
        const observer = new IntersectionObserver(
            ([entry])=>{
                if(!entry.isIntersecting || msg.attributes.read) return;
                onUpdate(msg, new Callback(observer));
            },
            {threshold: 1}
        );
        observer.observe(messageRef.current);
        return ()=>messageRef.current && observer?.unobserve?.(messageRef.current);
    }, []);

    return(
        <div ref={messageRef} className="mb-2">
            <div className={`d-flex flex-column ${user.id === msg.attributes.user.id ? 'align-items-end' : 'align-items-start'}`}>
                {msg.showSenderName && (
                    <div className="text-truncate fw-semibold mb-1">{msg.attributes.user.attributes.firstName} {msg.attributes.user.attributes.lastName}</div>
                )}
                <div
                    className={`bg-primary ${user.id === msg.attributes.user.id ? 'bg-opacity-25' : 'bg-opacity-10'} text-dark px-2 py-1 rounded-2`}
                    style={{maxWidth: '70%'}}
                >
                    <span>{msg.attributes.message}</span>
                    <span className="ms-3" style={{fontSize: '10px'}}>{utils.date.toLocalTime(msg.attributes.date)}</span>
                </div>
                <div className="d-none" style={{fontSize: '10px'}}>{msg.attributes.date}</div>
            </div>
            {error && (
                <div className={`d-flex flex-column ${user.id === msg.attributes.user.id ? 'align-items-end' : 'align-items-start'}`}>
                    <span className="user-select-none small bg-danger bg-opacity-10 rounded-1 px-2 text-danger">
                        <span>Server Error</span>
                        <span onClick={update} className="position-relative fw-semibold pointer text-decoration-underline ms-3">
                            <BiReset />
                            <span>Resend</span>
                            {loading && (
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </span>
                    </span>
                </div>
            )}
        </div>
    )
}