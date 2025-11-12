import apiSlice from "../../app/apiSlice";

const appartmentApiSlice= apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getAppartment:build.query({
            query:()=>({
                url:"/appartment/appartments"
            }),
            providesTags:["appartment"]
        }),
        addAppartment:build.mutation({
            query:(appartment)=>({
                url:"/appartment",
                method:"POST",
                body:appartment
            }),
            invalidatesTags:["appartment"],
        }),
        deleteAppartment:build.mutation({
            query:(id)=>({
                url:`/appartment/${id}`,
                method:"DELETE",
                body:id
            }),
            invalidatesTags:["appartment"],
        }),
        updateAppartment:build.mutation({
                query:({id,appartment})=>({
                    url:`/appartment/update/${id}`,
                    method:"PUT",
                    body:appartment
                }),
                invalidatesTags:["appartment"],        
        })
    })
})
export const {useAddAppartmentMutation,useUpdateAppartmentMutation,useDeleteAppartmentMutation,useGetAppartmentQuery}=appartmentApiSlice
export default appartmentApiSlice.reducer