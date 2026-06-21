/**
 * @docky.capability Templating
 * @docky.description Render a named template with data into a message body.
 *   Shared by every channel, so a change here ripples across Email, SMS and Push.
 * @docky.invariant All interpolated values are HTML/text escaped. A template must
 *   never emit raw user input - that is how a notification becomes an injection.
 * @docky.decision TPL-007 "one renderer for every channel so escaping rules live in one place"
 */
export function render(template: string, data: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => escape(data[k] ?? ""));
}

/**
 * @docky.capability Templating
 * @docky.description Escape a value for safe interpolation.
 */
export function escape(value: string): string {
  return value.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] ?? c));
}
