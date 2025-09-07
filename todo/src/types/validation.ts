import * as z from 'zod'

const signupSchema = z.object({
    firstname: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
    username: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const loginSchema = z.object({
    username: z.string().min(2).max(100),
    password: z.string().min(6).max(100)
});

export { signupSchema, loginSchema }