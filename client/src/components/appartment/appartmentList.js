import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { useGetAppartmentQuery } from "./appartmentApiSlice";
import { useAddToBasketMutation } from '../basket/basketApiSlice';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';

export default function Appartments() {
    const [layout, setLayout] = useState('grid');
 
    const { data: products = [] } = useGetAppartmentQuery();
    const [addToBasket] = useAddToBasketMutation();

    const addToCartBtn = async (product) => {
        try {
            alert("נוסף לסל ✅")
            await addToBasket({item:{ idAppartement:product._id,sDate:dates[0],eDate:dates[1]}}).unwrap();
            alert("נוסף לסל ✅")
        } catch (err) {
            console.error("שגיאה בהוספה לסל ❌", err);
        }
    };
    // const addToCartBtn = (product) => {
    //     addToBasket({ item: product });
    // };
    const [dates, setDates] = useState(null);
    const listItem = (product, index) => (
        
        <div className="col-12" key={product.id}>
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', {
                'border-top-1 surface-border': index !== 0
            })}>
                <img
                    className="w-9 sm:w-16rem xl:w-10rem shadow-2 block mx-auto border-round"
                    src={`http://localhost:2500/${product.image}`}
                    alt={product.name}
                />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-2">
                        <div className="text-2xl font-bold text-900">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                        <div className="text-sm text-gray-600 my-2">{product.discreption}</div>
                        <div className="text-sm text-gray-600 my-2"> גודל הדירה {product.size} מטר</div>
                        <span className="font-semibold text-gray-700">
                            <i className="pi pi-map-marker text-primary mr-2"></i>
                            {product.city}
                        </span>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel >
                            <Calendar selectionMode="range" inputId="בחר תאריכים" value={dates} onChange={(e) => setDates(e.value)} />
                                <label htmlFor="בחר תאריכים">בחר תאריכים</label>
                        </FloatLabel>
                        </div>
                    

                    <div className="flex flex-column align-items-end gap-2">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            className="p-button-rounded"
                            onClick={() => addToCartBtn(product)}
                            disabled={!dates || !dates[0] || !dates[1]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    
    const gridItem = (product) => (
        <div className="col-12 sm:col-6 xl:col-4 p-2" key={product.id}>
            <div className="p-4 border-1 surface-border surface-card border-round">
                <img
                    className="w-full shadow-2 border-round mb-3"
                    // src="1.png"
                    src={`http://localhost:2500/${product.image}`} 
                    alt={product.name}
                />
                <div className="text-xl font-bold mb-2">{product.name}</div>
                <Rating value={product.rating} readOnly cancel={false} />
                <div className="text-sm text-gray-600 my-2"> גודל הדירה {product.size} מטר</div>
                <div className="text-sm text-gray-600 my-2">{product.discreption}</div>
                <span className="text-xl font-semibold">{product.city}</span>

                <div className="flex justify-content-between align-items-center">
                    <span className="text-xl font-semibold">${product.price}</span>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <Calendar selectionMode="range" inputId="בחר תאריכים" value={dates} onChange={(e) => setDates(e.value) } />
                                <label htmlFor="בחר תאריכים">בחר תאריכים</label>
                        </FloatLabel>
                    </div>
                    <Button
                        icon="pi pi-shopping-cart"
                        className="p-button-rounded"
                        onClick={() => addToCartBtn(product)}
                        disabled={!dates || !dates[0] || !dates[1]}
                    />
                </div>
            </div>
        </div>
    );

    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        return layout === 'list' ? listItem(product, index) : gridItem(product);
    };

    const listTemplate = (products, layout) => (
        <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>
    );

    const header = (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    return (
        <div className="card" dir="rtl">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header} />
        </div>
    );
    
}
