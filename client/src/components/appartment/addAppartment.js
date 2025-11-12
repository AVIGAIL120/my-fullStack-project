import {useGetAppartmentQuery,useAddAppartmentMutation, useDeleteAppartmentMutation,useUpdateAppartmentMutation} from "./appartmentApiSlice"

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';


    const AddAppartment=()=>{

        let emptyProduct = {
            _id: "",
            name: '',
            image: "2.png",            
            price: 0,
            beds: 2,
            size: 0,
            discreption:"",
        };
    const [addAppartment,{data,isLoading,isSucces,isError,error}]= useAddAppartmentMutation() 
    const [deleteAppartment,{data1,isLoading1,isSucces1,isError1,error1}]= useDeleteAppartmentMutation()
    const [updateAppartment,{data2,isLoading2,isSucces2,isError2,error2}]= useUpdateAppartmentMutation()
    const {data:products=[],isLoading3,isSucces3,isError3,error3}= useGetAppartmentQuery()
    // if(isLoading1) return <p>laoding</p>
    // if(isError) return <p>error</p>
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        if(isSucces)
        {
            setProduct(emptyProduct)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        // if(isError)
        // {
        //     console.log(error);
        //         //setProduct({})
        //         toast.current.show({ severity: 'error', summary: 'Error', detail: 'Product Not Entered', life: 3000 });
        // }
    }, [isSucces]);
    // useEffect(() => {
    //     if(isSucces)
    //     setProduct(product)
    // }, [isSucces]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const formatCurrency2 = (value) => {
        return value.toLocaleString( { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);
      
        if (product.name.trim()) {
          let _products = [...products];
          let _product = { ...product };
          alert(product._id)

          if (product._id) {
            //const index = findIndexById(product.id);
          //  _products[index] = _product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      
            await updateAppartment({id:product._id,appartment:product}); // או useUpdateAppartmentMutation המתאים
;
          } else {
            _product._id = createId();
            // _product.image = 'product-placeholder.svg';
            _products.push(_product);
            //toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      
            await addAppartment(_product);
          }
      

          setProductDialog(false);
          setProduct(emptyProduct);
        }
      };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        deleteAppartment(product._id)
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        // let _products = products.filter((val) => !selectedProducts.includes(val));
        for(let i=0; i< selectedProducts.length;i++){
            deleteAppartment(selectedProducts[i]._id)
        }
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:2500/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '100px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const bedsBodyTemplate = (rowData) => {
        return formatCurrency2(rowData.beds);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem'}}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem'}}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="size" header="size" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="beds" header="beds" body={bedsBodyTemplate} ></Column> 
                     <Column field="disception" header="disception" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`http://localhost:2500/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
 
                <div className="field">
                    <label className="mb-3 font-bold">מדינה</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">ישראל</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">בלגיה</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">שוויץ</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">הולנד</label>
                        </div>
                    </div>
                </div>
                
                <div className="formgrid grid">
                <div className="field">
                    <label htmlFor="image" className="font-bold">
                        image
                    </label>
                    <InputText id="name" value={product.image} onChange={(e) => onInputChange(e, 'image')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.image })} />
                    {submitted && !product.image && <small className="p-error">image is required.</small>}
                </div>
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="size" className="font-bold">
                            size
                        </label>
                        <InputNumber id="size" value={product.size} onValueChange={(e) => onInputNumberChange(e, 'size')} />
                    </div>
                    <div className="field col">
                        <label htmlFor="beds" className="font-bold">
                            beds
                        </label>
                        <InputNumber id="beds" value={product.beds} onValueChange={(e) => onInputNumberChange(e, 'beds')} />
                    </div>
                    <div className="field">
                    <label htmlFor="discreption" className="font-bold">
                        Discreption
                    </label>
                    <InputTextarea id="discreption" value={product.discreption} onChange={(e) => onInputChange(e, 'discreption')} required rows={3} cols={20} />
                </div>

                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {<Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> } 
        </div>
    );
}
export default AddAppartment;
        


// const Appartment =()=>{
//     const [name,setName]=useState("");
//     const [size,setSize]=useState("");
//     const [rooms,setRooms]=useState('0');
//     const [beds,setBeds]=useState("0");
//     const [price,setPrice]=useState("0");
//     const [description,setDescription]=useState("");

//     const [appartment,{data:appart,isSucess,isError,error,isLaoding}]=useAddAppartmentMutation()
    
//     if(isLaoding) return <p>laoding</p>
//     if(isError) return <p>error</p>
    
//     const handleSubmit= async(e)=>{
//         e.preventDefult()
//         appartment(name,size,rooms,beds,price,description)
//     }
// //     return(
// //         <div>
// //             <h1>דירות</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <input placeholder="שם"  onChange={(e) => { setName(e.target.value) }} type="text" ></input>
                   
// //                 <input placeholder="גודל דירה"  onChange={(e) => setSize(e.target.value)} type="number" ></input>

// //                 <input placeholder="מספר חדרים"  onChange={(e) => setRooms(e.target.value)} type="number" ></input>

// //                 <input placeholder="מספר מיטות" required onChange={(e) => setBeds(e.target.value)} type="number" ></input>

// //                 <input placeholder="מחיר" required onChange={(e) => setPrice(e.target.value)} type="number" ></input>

// //                 <textarea placeholder="תיאור הדירה" required onChange={(e)=> setDescription(e.target.value)} type="text"></textarea>

// //                 <button type="submit">הרשם</button>
                
// //             </form>

// //        </div>
// //     )
// // }
// // export default Appartment