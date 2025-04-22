import {z} from 'zod'

export const medicalNoteSchema = z.object({
    title: z.string().min(3, {message: 'Title must be at least 3 characters long'}),
    content: z.string().min(10, {message: 'Content must be at least 10 characters long'}),
    date: z.date().optional(),
    doctor: z.string().min(3, {message: 'Doctor name must be at least 3 characters long'}),
    user: z.string().optional(),
    // signed_by: z.string().optional(),
})