import { render } from "./Templates";
// External: the Twilio SDK is in another package - unknown/unverifiable to DockyDoo.
import { messages } from "twilio";

export class SmsChannel {
  /**
   * @docky.capability SMS
   * @docky.description Render a template and deliver it as an SMS via Twilio.
   * @docky.link render
   * @docky.link twilio.messages
   * @docky.debt impact=med likelihood=high reason="no per-recipient rate limiting; a loop can fan out and rack up spend" ticket=NOTIF-90
   * @docky.cruft Legacy GSM-7 unicode workaround, dead since Twilio handles it now - delete it.
   */
  send(to: string, template: string, data: Record<string, string>): void {
    const body = render(template, data);
    messages({ to, body });
  }
}
