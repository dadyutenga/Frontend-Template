// In-memory only: real apps should use server-managed HttpOnly cookies.
let token:string|null=null;
export const tokenStorage={get:()=>token,set:(value:string)=>{token=value},clear:()=>{token=null}};
