import { z } from "zod";

const commentSchema = z.object({
  commentId: z.string().length(24, "Id invalido"),
  postedBy: z.string(),
  songId: z.string(),
  body: z.string(),
});

export const deleteCommentSchema = commentSchema.pick({commentId: true})

export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
