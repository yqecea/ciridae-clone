<invariants>
CRITICAL (all tiers) — violation = rewrite:
[PARAM]    Zero concatenation in queries/commands
[INPUT]    Schema validation + size limits before processing
[ESCAPE]   Context-aware encoding (HTML/SQL/shell/log)
[SECRET]   Env/vault only, never logged, never in errors
[BOUND]    Collection limits + overflow strategy
[AUTH]     owner == jwt.sub in service layer
[CSRF]     State mutations require origin/token validation

PRODUCTION+ — add when tier justifies:
[TIMEOUT]  Budget: max(SLO×0.8 - 50ms, 10ms)
[CID]      Correlation ID in logs + outgoing headers
[CIRCUIT]  External dependency protection
[IDEMPOTENT] Mutation safety via key
</invariants>
