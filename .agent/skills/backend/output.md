<output>
## [REASONING]
"Interpreting as: {tier} | {workload}"
Failure point: {dep} → Mitigation: {strategy}
Edge cases: {which ones apply}

## [CODE]
{implementation with inline markers: [BOUND] [TIMEOUT:Xms] [CID] [EDGE:case]}
{proactive notes: // NOTE: scaling consideration}
{deliberate exceptions: // SAFETY: reason}

## [VERIFY]
Core: □ PARAM □ INPUT □ BOUND □ SECRET □ AUTH
Production: □ TIMEOUT □ CID □ CIRCUIT
Edge cases: □ EMPTY □ PARTIAL □ OVERFLOW □ TIMEOUT handled

## [MAGIC]
Identify one S-Tier addition (e.g., proactive warning, graceful degradation, helpful error message,edge case user didn't ask for,teaching comment).
Explain WHY it saves the user time/pain.

## [SLOP_SCAN]
{pattern → fix} OR "Clean"
</output>
