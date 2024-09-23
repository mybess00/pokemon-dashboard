import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),  
  password: z.string().min(1, "Password is required"),
});

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

export function logout(): void {
  document.cookie = 'auth=; Max-Age=0; path=/';
}
