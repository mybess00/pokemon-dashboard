import { z } from 'zod';

//validacion de los datos del login
const loginSchema = z.object({
  username: z.string().min(4, "Username is required"),  
  password: z.string().min(6, "Password is required"),
});

//funcion de simulacion de autenticacion
//recibe username y password si son correctos los guarda en una cookie 'auth' con duracion de 10 minutos
export function mockAuthenticate({username, password} : {username: string, password: string}): Promise<boolean> {
  const result = loginSchema.safeParse({ username, password });

  if (!result.success) {
    return Promise.reject(new Error(result.error.errors.map(err => err.message).join(', ')));
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '12345678') {
        document.cookie = `auth=true; Max-Age=600; path=/;`
        resolve(true);
      } else {
        resolve(false);
      }
    }, 5000); 
  });
}

//funcion para simular cerrar session y eliminar la cookie de inicio de sesion
export function logout(): void {
  document.cookie = 'auth=; Max-Age=0; path=/';
}
