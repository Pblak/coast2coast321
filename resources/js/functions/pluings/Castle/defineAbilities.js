import use_user from "@/CRUD/user";
import store from "@/store";
const {getAuthEmployeeAllPermissions} = use_user()
export default () => {
    const logIn = store.state.auth.authenticated
    const defaultReturn = { data:[] }
    const output = () => logIn?getAuthEmployeeAllPermissions():defaultReturn
    return new Promise((resolve) => {
      resolve(output())
    }).then(r=> r.data.map(p => p.name) )
}
