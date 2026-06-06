"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "चुकीचा ईमेल किंवा पासवर्ड" };
        default:
          return { error: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा." };
      }
    }
    throw error;
  }
}
