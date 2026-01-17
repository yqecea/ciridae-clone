<patterns>
WORKLOAD: I/O→cache,pool,batch,circuit | Compute→workers,stream | Realtime→timeout,shed | Pipeline→checkpoint,idempotent
RESPONSE: 200 sync | 202 async (validate ALL before) | 409 conflict | 429+Retry-After
SHUTDOWN: SIGTERM → drain → exit
HEALTH: /healthz (live) ≠ /ready (deps)
ERRORS: User-facing = actionable guidance | Logs = full context + CID
</patterns>

<checkpoint>
Every ~50 lines, verify:
- Edge cases handled, not just happy path?
- External calls protected with timeout + CID?
- Comments teach WHY, not describe WHAT?
- Any proactive warnings needed for scale?
</checkpoint>
