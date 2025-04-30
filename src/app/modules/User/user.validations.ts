import { z } from "zod";

export const userCreateValidation = z.object({
    body: z.object({
        password: z.string().min(8, "Password must be at least 8 character!"),
        user: z.object({
            name: z.string().min(3, "Name must be at least 3 character!"),
            email: z.string().email()
        })
    })
})


const UserValidation = { userCreateValidation };

export default UserValidation;