import React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Heading } from "@react-email/heading";

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f3f3f3", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ color: "#111827" }}>Welcome to GratiFi 🎉</Heading>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Hi {userName},<br />
            <br />
            Thanks for signing up to <strong>GratiFi</strong>! We’re glad to
            have you on board.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Let us know if you ever have any questions.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333" }}>
            Cheers,
            <br />
            The GratiFi Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
