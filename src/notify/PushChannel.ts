import { render } from "./Templates";

export class PushChannel {
  /**
   * @docky.capability Push
   * @docky.description Render a template and deliver it as a mobile push.
   * @docky.link render
   * @docky.todo priority=low "support web push (VAPID) in addition to mobile"
   * @docky.cruft Old A/B feature-flag branch that is always false now - remove it.
   */
  send(deviceToken: string, template: string, data: Record<string, string>): void {
    const body = render(template, data);
    void deviceToken;
    void body;
  }
}
