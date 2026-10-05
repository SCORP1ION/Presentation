import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/blog'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        difficulty: z.enum([
            'Muy fácil',
            'Fácil',
            'Medio',
            'Difícil',
            'Muy difícil'
        ]),
        platform: z.string(),
        os: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
        author: z.string()
    })
});

export const collections = {
    blog
};
