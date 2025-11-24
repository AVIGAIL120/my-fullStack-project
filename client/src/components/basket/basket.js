import {useState} from "react"
import {useGetBasketQuery} from "./basketApiSlice"
import { useDeletefromBasketMutation } from "./basketApiSlice";
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { getBasket } from './basketApiSlice';


export default function Basket() {

    const [deleteProduct,{isLoading1,isError1}]= useDeletefromBasketMutation()
    const {data:products=[],isLoading,isError}= useGetBasketQuery()
    // console.log(products);
    
    if (isLoading) return <p>טוען סל...</p>;
    if (isError) return <p>שגיאה בטעינת הסל</p>;
    if (isLoading1) return <p>טוען סל...</p>;
    if (isError1) return <p>שגיאה בטעינת הסל</p>;




    const handleDelete = (item_id) => {
     console.log("id"+item_id);
             deleteProduct(item_id);//.unwrap();

    };
    // console.log(products[0]._id)
    const itemTemplate = (data) => {
        console.log(data);
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:2500/${data.idAppartement.image}`} alt={data.idAppartement.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.idAppartement.name}</div>
                                <div className="text-700">{data.idAppartement.price}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <Rating value={data.idAppartement.beds} readOnly cancel={false}></Rating>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.idAppartement.discreption}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">${data.idAppartement.price}</span>
                            <Button label="Delete" icon="pi pi-trash" onClick={() =>handleDelete(data._id)}/>
                            {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                            {/* <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="card">
            <DataScroller  value={products} 
            itemTemplate={itemTemplate} 
            rows={5} 
            header="Click Load Button at Footer to Load More" />
            <p>shani</p>
        </div>
    )
}

