// pages/api/example.ts

import { revalidateTag } from 'next/cache';

// Define possible event types
type StrapiEventType = "entry.create" | "entry.update" | "entry.delete";

// Strapi webhook payload type
interface StrapiWebhookPayload {
  event: StrapiEventType; 
  model: string;
  entry: {
    id: number;
    [key: string]: any; 
  };
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  const payload = await request.json() as StrapiWebhookPayload
  console.log(payload);
  revalidateTag(payload.model)

  return new Response('Success!', {
    status: 200,
  })
}


