import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db, auth } from "@/app/lib/firebase-admin";

export async function POST(req: Request) {
  // Verify webhook signature
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env");
  }

  // Get headers
  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response(`Error occurred: ${err}`, {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name } = evt.data;
    if (!id) {
      return new Response("Missing user ID", { status: 400 });
    }

    const primaryEmail = email_addresses[0]?.email_address;

    try {
      // Create Firebase auth user
      await auth.createUser({
        uid: id,
        email: primaryEmail,
        displayName: username || `${first_name} ${last_name}`.trim(),
      });

      // Create user document in Firestore
      await db.collection("users").doc(id).set({
        uid: id,
        email: primaryEmail,
        username: username,
        firstName: first_name,
        lastName: last_name,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error syncing user to Firebase:", error);
      return new Response("Error syncing user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, username, first_name, last_name } = evt.data;
    if (!id) {
      return new Response("Missing user ID", { status: 400 });
    }

    const primaryEmail = email_addresses[0]?.email_address;

    try {
      // Update Firebase auth user
      await auth.updateUser(id, {
        email: primaryEmail,
        displayName: username || `${first_name} ${last_name}`.trim(),
      });

      // Update user document in Firestore
      await db.collection("users").doc(id).update({
        email: primaryEmail,
        username: username,
        firstName: first_name,
        lastName: last_name,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating user in Firebase:", error);
      return new Response("Error updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("Missing user ID", { status: 400 });
    }

    try {
      // Delete Firebase auth user
      await auth.deleteUser(id);
      // Delete user document from Firestore
      await db.collection("users").doc(id).delete();
    } catch (error) {
      console.error("Error deleting user from Firebase:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
