import { z } from "zod";

const songInputValidationSchema = z.object({
  songId: z.string().length(24, "id no valido"),
  uploadedBy: z.string().length(24, "id no valido"),
  title: z
    .string()
    .min(1, "Tienes que tener almenos 1 letra o digito para el titulo"),
  duration: z.number(),
  like: z.array(z.string()).optional().default([]),
  views: z.array(z.string()).optional().default([]),
  pictureUrl: z.string(),
  audioUrl: z.string(),
});

export const createSongSchema = songInputValidationSchema.omit({
  songId: true,
  like: true,
  views: true,
});

export const songIdSchema = songInputValidationSchema.pick({ songId: true });

export const uploadedBySchema = songInputValidationSchema.pick({
  uploadedBy: true,
});
export const getSongSchema = songInputValidationSchema.pick({title: true})

export type SongInput = z.infer<typeof createSongSchema>;
export type SongIdInput = z.infer<typeof songIdSchema>;
export type getSongInput = z.infer<typeof getSongSchema>
export type uploadedByInput= z.infer<typeof uploadedBySchema>