// import { z } from "zod";

// export const chatMessageSchema = z.object({
//   id: z.string().optional(),
//   role: z.enum(["user", "assistant", "system"], {
//     message: "Role not supported",
//   }),
//   content: z
//     .string({
//       message: "content is undefine, make sure you are passing content",
//     })
//     .min(1)
//     .max(1000, "Message too long"),
// });

// export const chatRequestSchema = z
//   .array(chatMessageSchema)
//   .nonempty({ message: "Messages array cannot be empty" })
//   .max(50, { message: "Your Chat History is too long, Please Start New Chat" });



import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"], {
    message: "Role not supported",
  }),
  content: z
    .string({
      message: "content is undefine, make sure you are passing content",
    })
    .min(1)
    .max(1000, "Message too long"),
});

export const chatRequestSchema = z
  .array(chatMessageSchema)
  .nonempty({ message: "Messages array cannot be empty" })
  .max(50, { message: "Your Chat History is too long, Please Start New Chat" });
