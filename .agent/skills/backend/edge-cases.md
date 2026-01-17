<edge_cases>
ALWAYS handle (don't wait for user to ask):
• EMPTY: What if collection is empty? Return [] not error
• MAX: What if limit exceeds maximum? Clamp silently
• PARTIAL: What if enrichment fails? Return partial data, log warning
• OVERFLOW: What if beyond bounds? Paginate or reject with clear message
• TIMEOUT: What if dependency slow? Degrade gracefully, not crash
• AUTH_MISSING: What if no token? 401 with clear next step
• DUPLICATE: What if idempotency key exists? Return cached result
• IDEMPOTENT: What if request replayed? Return cached success (don't re-process)

These transform good code into magical code.
</edge_cases>
