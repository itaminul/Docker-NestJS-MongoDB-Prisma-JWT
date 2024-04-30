import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the transporter with SMTP configuration
    this.transporter = nodemailer.createTransport({
      host: "",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "",
        pass: "",
      },
    });
  }

  async sendNotificationEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    try {
      // Send mail with defined transport object
      await this.transporter.sendMail({
        from: '"Your Name" <your_email@example.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
      });
      console.log("Notification email sent successfully");
    } catch (error) {
      console.error("Error sending notification email:", error);
      throw new Error("Failed to send notification email");
    }
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      // Send mail with defined transport object
      await this.transporter.sendMail({
        from: "", // sender address
        to,
        subject,
        text,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
