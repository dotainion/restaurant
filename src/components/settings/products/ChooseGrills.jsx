import { useState, useEffect } from "react";
import { ProductCardEditableBuilder } from "../../ProductCardEditableBuilder"

export const ChooseGrills = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Grills</h4>
            <ProductCardEditableBuilder
                name="grill"  
                defaultImage="https://www.thespruceeats.com/thmb/Iud5JolcsQKK1vekclVq-orpzTI=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/ses-charcoal-grills-test-char-broil-kettleman-tru-infrared-22-5in-rkilgore-105-47fbc864934943dba173e579bccc3858.jpg"
            />
        </div>
    )
}