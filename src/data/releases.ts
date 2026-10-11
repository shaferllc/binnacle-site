/**
 * Releases served as the Sparkle feed at /appcast.xml. Add the newest first.
 * `signature` and `length` come from Sparkle's sign_update on the notarized DMG:
 *   .build/artifacts/sparkle/Sparkle/bin/sign_update dist/Binnacle-<v>.dmg
 * The DMG goes in public/download/ under `file`.
 */
export interface Release {
  version: string;   // CFBundleShortVersionString
  build: string;     // CFBundleVersion
  date: string;      // RFC 822
  file: string;
  signature: string; // sparkle:edSignature
  length: number;
  notes: string[];
}

export const RELEASES: Release[] = [
  {
    version: "0.1.0",
    build: "1",
    date: "Sun, 11 Oct 2026 14:00:00 -0700",
    file: "Binnacle-0.1.0.dmg",
    signature: "SIGNATURE_PENDING",
    length: 0,
    notes: ["First release."],
  },
];

export const LATEST: Release = RELEASES[0]!;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function appcastXML(origin: string): string {
  const items = RELEASES.filter((r) => r.signature !== "SIGNATURE_PENDING").map((r) => `
    <item>
      <title>Binnacle ${r.version}</title>
      <pubDate>${r.date}</pubDate>
      <sparkle:version>${r.build}</sparkle:version>
      <sparkle:shortVersionString>${r.version}</sparkle:shortVersionString>
      <sparkle:minimumSystemVersion>14.0</sparkle:minimumSystemVersion>
      <description><![CDATA[<ul>${r.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>]]></description>
      <enclosure url="${origin}/download/${r.file}" length="${r.length}" type="application/octet-stream" sparkle:edSignature="${r.signature}"/>
    </item>`).join("");
  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">
  <channel>
    <title>Binnacle</title>
    <link>${origin}/appcast.xml</link>
    <description>Binnacle updates</description>${items}
  </channel>
</rss>
`;
}
