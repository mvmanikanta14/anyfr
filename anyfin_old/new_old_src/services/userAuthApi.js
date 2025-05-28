// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// // Define a service using a base URL and expected endpoints
// export const userAuthApi = createApi({
//   reducerPath: 'userAuthApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/' }),

//   endpoints: (builder) => ({
//     clientUser: builder.mutation({
//       query: (user) => {
//         return {
//           url: 'api/client/clients/',
//           method: 'GET',
//           body: user,
//           headers: {
//             'Content-type': 'application/json',
//           }
//         }
//       }
//     }),
   
   
//   }),
// })

// export const { useRegisterUserMutation, useClientUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation , useGetViewprofileQuery} = userAuthApi