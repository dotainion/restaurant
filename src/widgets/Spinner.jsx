
export const Spinner = ({show, inline, sticky, transparent, sm}) =>{
    if(!show) return null;
    return(
        <div 
            className={`top-0 start-0 position-${
                inline 
                    ? `${
                        sticky 
                            ? 'sticky' 
                            : 'absolute'
                    } w-100 h-100` 
                    : `${
                        sticky 
                            ? 'sticky' 
                            : 'fixed'
                    } w-100 vh-100`
            } ${
            transparent 
                ? 'bg-transparent' 
                : 'bg-dark bg-opacity-50'
            }`} 
            style={{zIndex: '9999999999999999989'}}
        >
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div className={`colorful-spinner ${sm ? 'colorful-spinner-sm' : ''}`} />
            </div>
        </div>
    )
}