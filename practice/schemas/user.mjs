import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(10).max(30)
})