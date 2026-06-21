# Example: notifications

A multi-channel notification service. It ships fine, but it carries real,
**tracked** debt - and one shared renderer that everything depends on. This is
the example for seeing DockyDoo's registers and reuse graph light up.

## What it demonstrates

- **Several capability pages.** `Email`, `SMS`, `Push`, and a shared `Templating`
  page - so the contents tree has real structure.
- **Reuse + blast radius.** `Templating.render` is reused by all three channels,
  so it shows up as load-bearing with a wide blast radius: change the escaping
  rule and every channel is affected.
- **A full Tech debt register.** Debt items with different risk (impact x
  likelihood): a high-impact hard-coded retry in Email, a high-likelihood missing
  rate-limit in SMS, each with a ticket.
- **Cruft (cleanup debt).** Dead code paths in SMS and Push marked with
  `@docky.cruft` - lower stakes than debt, but still surfaced.
- **A To do register with priorities.** A `med` bounce-handling task, a `low`
  web-push task.
- **Unknown-external.** Calls into the SendGrid and Twilio SDKs are recorded as
  edges but marked external/unverifiable, distinct from a closeable gap.
- **A passing budget that still shows the debt.** `budget` is set generously, so
  `docky review --fail-on over-budget` exits 0 even though the registers are full.
  Honest tracking, not a blocked deploy.

## Try it

```
docky build                       # 4 pages; Templating reused across channels
docky build   # see the "Tech debt" and "To do" aggregate pages fill in
docky review                      # notes per channel, nothing blocking
docky attest                      # bind the notes; then drift shows up on edits
```
