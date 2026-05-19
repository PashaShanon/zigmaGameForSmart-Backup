const STATS_BASE_URL = "https://app.gameforsmart.com/stat";

/** 20-char base32 session id from xid — not Colyseus room.sessionId (~9 chars). */
export function isValidSupabaseSessionId(sid: string | null | undefined): boolean {
  if (!sid || sid === "undefined" || sid === "null") return false;
  return sid.length >= 18;
}

function parseSessionFromStorage(key: string): string | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const sid = parsed.sessionId || parsed.supabaseSessionId;
    return isValidSupabaseSessionId(sid) ? sid : null;
  } catch {
    const match = raw.match(/"sessionId":"([^"]+)"/);
    return match && isValidSupabaseSessionId(match[1]) ? match[1] : null;
  }
}

/**
 * Resolve the main Supabase game_sessions id (20-char xid).
 * Never use ranking[].sessionId — that is the Colyseus client session id.
 */
export function resolveSupabaseSessionId(room?: {
  metadata?: { sessionId?: string };
}): string | null {
  const fromLs = localStorage.getItem("supabaseSessionId");
  if (isValidSupabaseSessionId(fromLs)) return fromLs!;

  const fromMeta = room?.metadata?.sessionId;
  if (isValidSupabaseSessionId(fromMeta)) return String(fromMeta);

  const fromCurrent = parseSessionFromStorage("currentRoomOptions");
  if (fromCurrent) return fromCurrent;

  const fromLast =
    parseSessionFromStorage("lastGameOptions") ||
    parseSessionFromStorage("hostLastGameOptions");
  if (fromLast) return fromLast;

  return null;
}

export function openGameForSmartStats(
  room?: { metadata?: { sessionId?: string } },
  onMissing?: () => void,
): void {
  const sid = resolveSupabaseSessionId(room);
  if (sid) {
    window.open(`${STATS_BASE_URL}/${sid}`, "_blank");
    return;
  }
  if (onMissing) onMissing();
}
