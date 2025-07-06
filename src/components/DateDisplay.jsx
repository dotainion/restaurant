import { useEffect, useState } from "react";
import { utils } from "../utils/Utils";

export const DateDisplay = () =>{
    const [currentDate, setCurrentDate] = useState(utils.date.toLocalDate(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(utils.date.toLocalDate(new Date()));
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return(
        <h5 className="text-secondary small">{currentDate}</h5>
    )
}