import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .single();
    if (error) throw new Error(error.message);
    return product;
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required").max(100),
      email: z.string().email("Invalid email").max(255),
      subject: z.string().min(1, "Subject is required").max(200),
      message: z.string().min(1, "Message is required").max(2000),
    })
  )
  .handler(async ({ data }) => {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (error) throw new Error(error.message);

    // Send notification email via Resend (best-effort; don't fail the form if email fails)
    try {
      const resendKey = process.env.RESEND_API_KEY;
      const notifyTo = process.env.CONTACT_NOTIFY_EMAIL ?? "mohammadahmed789666@gmail.com";
      if (resendKey) {
        const html = `
          <h2>New Contact Form Submission — Ahmed Gadgets</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #ccc;padding-left:12px;">${escapeHtml(data.message)}</p>
        `;
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Ahmed Gadgets <onboarding@resend.dev>",
            to: [notifyTo],
            reply_to: data.email,
            subject: `New contact: ${data.subject}`,
            html,
          }),
        });
        if (!res.ok) {
          console.error("[contact] Resend send failed:", res.status, await res.text());
        }
      } else {
        console.warn("[contact] RESEND_API_KEY not set — skipping email notification");
      }
    } catch (e) {
      console.error("[contact] Email notification error:", e);
    }

    return { success: true };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
