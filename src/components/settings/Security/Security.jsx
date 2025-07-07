import { SecurityLayout } from '../../../layouts/SecurityLayout';
import { SecurityRouter } from '../../../routers/SecurityRouter';

export const Security = () =>{
    return(
        <SecurityLayout>
            <SecurityRouter/>
        </SecurityLayout>
    )
}