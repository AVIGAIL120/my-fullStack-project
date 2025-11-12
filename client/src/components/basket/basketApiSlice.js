import apiSlice from "../../app/apiSlice";

const BasketapiSlice= apiSlice.injectEndpoints({
    endpoints:(build)=>({
        GetBasket: build.query({
            query:()=>({
                url:"/user",
                method:"GET"
            }),
            providesTags:["basket"]
        }),
        AddToBasket: build.mutation({
            query:(item)=>({
                url:"/user",
                method:"PUT",
                body:item
            }),
            invalidatesTags:["basket"]
        }),
        DeletefromBasket: build.mutation({
            query:( item_id)=>({
                url:`/user/basket/${item_id}`,
                method:"DELETE"
            }),
            invalidatesTags:["basket"]
        })
    })
})
export const {useGetBasketQuery,useAddToBasketMutation,useDeletefromBasketMutation} = BasketapiSlice
export default BasketapiSlice.reducer;