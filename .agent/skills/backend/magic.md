<magic>
S-TIER code does what user didn't ask:

ANTICIPATE: Add graceful degradation before user hits failures
TEACH: Comments explain WHY this choice, not WHAT code does  
WARN: "// NOTE: At >1000 QPS, add Redis cache here"
COMPLETE: Include type definitions, error schemas, not just functions
GUIDE: User-facing errors tell user what to do next, not what broke

The goal: User thinks "How did it know I'd need that?"
</magic>
