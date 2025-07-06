import { CiImageOn } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { OverlayModal } from "./OverlayModal";
import { api } from "../request/Api";
import { useUtils } from "../providers/UtilsProvider";
import { CATEGORY } from "../contents/Products";
import { Spinner } from "../widgets/Spinner";

export const SetProductOverlay = ({show, close, productToEdit, defaultImage}) =>{
    const { productInfiniteScrollUtils, toast } = useUtils();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const idRef = useRef(null);
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const updateProduct = () =>{
        const category = productInfiniteScrollUtils.pageCategory;
        if(!Object.values(CATEGORY).includes(category)){
            return toast.error('Invalid category.');
        }
        setLoading(true);
        const data = {
            id: idRef.current,
            name: nameRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            category: category,
            image: ''
        }
        api.product.set(data).then((response)=>{
            close?.();
        }).catch((error)=>{
            toast.error(error);
        }).finally(()=>setLoading(false));
    }

    const fileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    useEffect(()=>{
        if(!productToEdit){
            idRef.current = null;
            return;
        }
        idRef.current = productToEdit.id;
        nameRef.current.value = productToEdit.attributes.name;
        priceRef.current.value = productToEdit.attributes.price;
        descriptionRef.current.value = productToEdit.attributes.description;
    }, [productToEdit]);

    return(
        <OverlayModal title={`${productToEdit ? 'Edit' : 'Create new'} product`} show={show} close={close}>
            <div className="position-relative d-flex flex-column flex-md-row gap-4">
                <div className="d-flex flex-column text-center">
                    <img
                        className="rounded-circle m-auto"
                        src={image || defaultImage}
                        alt=""
                    />
                    <input className="d-none" onChange={fileChange} type="file" id="file" />
                    <label className="d-flex align-items-center justify-content-center gap-2 btn btn-orange w-100 d-block mt-3" htmlFor="file">Add Image<CiImageOn/></label>
                </div>
                <div className="flex-fill details">
                    <div className="mb-3">
                        <div className="small mb-1">Product Name</div>
                        <input ref={nameRef} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Product Name..." />
                    </div>
                    <div className="mb-3">
                        <div className="small mb-1">Product Price</div>
                        <input ref={priceRef} className="bg-dark text-light form-control border border-lightly shadow-none" placeholder="Product Price..." />
                    </div>
                    <div className="mb-5">
                        <div className="small mb-1">Product Description</div>
                        <textarea ref={descriptionRef} className="bg-dark text-light form-control border border-lightly shadow-none" rows={5} />
                    </div>
                    <button onClick={updateProduct} className="d-flex align-items-center justify-content-center gap-2 btn btn-orange w-100">{productToEdit ? 'Edit' : 'Save'} Product<AiOutlineProduct/></button>
                </div>
                <Spinner show={loading} inline />
            </div>
        </OverlayModal>
    )
}