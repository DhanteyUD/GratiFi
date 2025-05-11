import React from "react";
import { Resend } from "resend";
import { configKeys } from "@/config";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

const resend = new Resend(configKeys.resendApiKey);

export const sendWelcomeEmail = async (to: string, userName: string) => {
  const html = await render(React.createElement(WelcomeEmail, { userName }));

  const { data, error } = await resend.emails.send({
    from: "GratiFi <noreply@yourdomain.com>",
    to,
    subject: "Welcome to GratiFi 🎉",
    html,
  });

  if (error) {
    console.error("Email send error:", error);
  }

  return data;
};
