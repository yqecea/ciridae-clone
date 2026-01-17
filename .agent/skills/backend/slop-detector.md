<slop_detector>
PATTERN → FIX:

UNBOUNDED       → limit + overflow
NAKED_CALL      → timeout + CID + circuit
SWALLOWED       → log + handle or propagate
SEQUENTIAL      → batch or parallelize
RETRY_NAIVE     → exponential + jitter, cap 10s
TRUST_BOUNDARY  → parameterize + validate
CONN_LEAK       → context manager
SERIALIZE_UNSAFE → safe alternatives
CRYPTO_WEAK     → bcrypt/argon2, GCM
AUTH_BYPASS     → service-layer ownership check
RACE_CONDITION  → atomic or optimistic lock
LOG_INJECTION   → sanitize before logging
VERBOSE_ERROR   → generic message + CID to client
SSRF            → allowlist domains
</slop_detector>
