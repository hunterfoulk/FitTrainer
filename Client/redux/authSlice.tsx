import { createSlice } from '@reduxjs/toolkit'

interface Auth {
    auth: boolean
}


const initialState = {
    auth: false,
} as Auth


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authTrue: (state: Auth) => {
            state.auth = true
            localStorage.setItem('_ftTrainerAuth', JSON.stringify({ isAuth: true }))
            console.log("auth true fired", state.auth)
            window.location.href = "/dashboard"
        },
        authFalse: (state: Auth) => {

            state.auth = false
        },

    },
})






export const { authTrue, authFalse } = authSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.auth.value

export default authSlice.reducer