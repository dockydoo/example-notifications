import { render } from "./Templates";
// External: the SendGrid SDK lives in another package. DockyDoo sees the call
// but not the source, so it renders as external / unknown.
import { send as sgSend } from "@sendgrid/mail";

export class EmailChannel {
  /**
   * @docky.capability Email
   * @docky.description Render a template and deliver it as an email via SendGrid.
   * @docky.link render
   * @docky.link sendgrid.send
   * @docky.debt impact=high likelihood=med reason="retry/backoff is hard-coded to 3 tries; should use the shared RetryPolicy" ticket=NOTIF-88
   * @docky.todo priority=med "handle hard bounces and unsubscribe webhooks"
   */
  send(to: string, template: string, data: Record<string, string>): void {
    const body = render(template, data);
    sgSend({ to, html: body });
  }
}
