import { ILoginProps, IRegisterProps } from "../types/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function parseResponseSafely(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { message: text || "Respuesta no valida del servidor" };
}

//funcion de login
export async function loginService(userData: ILoginProps) {
  try {
   const response = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
   })
    if(response.ok){
        const parsedResponse = await parseResponseSafely(response)
      return parsedResponse;
    } else {
    // Si el status no es 200, intentamos leer el error que manda el back
        const errorData = await parseResponseSafely(response);
      throw new Error(errorData.message || "Fallo el servidor al loguearse");
  }} catch (error: any) {
    throw new Error(error)
  }
}

export async function register (userData: IRegisterProps) {
    try{
      
    const payload = {
      userName: userData.username,
      genre: userData.genre,
      email: userData.mail,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      profilePic: "",
      age: userData.age,
      height: userData.height,
      weight: userData.weight
    };

    const response = await fetch(`${APIURL}/auth/signup-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }); 
    
    if(response.ok) {
      const parsedResponse = await parseResponseSafely(response);
        return parsedResponse;
    } else {
      const errorData = await parseResponseSafely(response);
      throw new Error(errorData.message || "Error en la registración");
    }
} catch(error: any){
  throw new Error(error?.message || "No fue posible registrar el usuario");
    }
}