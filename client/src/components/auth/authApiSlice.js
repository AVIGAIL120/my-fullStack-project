import apiSlice from "../../app/apiSlice";

const AuthapiSlice= apiSlice.injectEndpoints({
    endpoints:(build)=>({
        login: build.mutation({
            query:(info)=>({
                url:"/authUser/login",
                method:"POST",
                body: info
            }),
            validateTags:["users"]
        }),
        register: build.mutation({
            query:(user)=>({
                url:"/authUser/register",
                method:"POST",
                body: user
            }),
            invalidatesTags:["users"]
        })
    })
})
export const {useLoginMutation,useRegisterMutation}= AuthapiSlice;
