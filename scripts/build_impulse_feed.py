import json, re, feedparser
from datetime import datetime, timezone
from pathlib import Path

SUBSTACK_FEED = "https://alexanderforum.substack.com/feed"

TAG_RE = re.compile(r"<[^>]+>")

def html_to_text(s: str) -> str:
    return TAG_RE.sub("", s or "").strip()

def first_image(html: str) -> str | None:
    m = re.search(r'<img[^>]+src="([^"]+)"', html or "", flags=re.I)
    return m.group(1) if m else None

def main():
    d = feedparser.parse(SUBSTACK_FEED)
    items = []
    for e in d.entries[:25]:
        content_html = ""
        if "content" in e and e.content:
            content_html = e.content[0].value
        elif "summary" in e:
            content_html = e.summary

        items.append({
            "id": e.get("id") or e.get("link"),
            "url": e.get("link"),
            "title": e.get("title"),
            "date_published": e.get("published"),
            "summary": html_to_text(content_html)[:400],
            "content_text": html_to_text(content_html),
            "image": first_image(content_html),
        })

    out = {
        "version": "https://jsonfeed.org/version/1",
        "title": "Impulse – Alexander Forum",
        "home_page_url": "https://alexander.forum/impulse/",
        "feed_url": "https://alexander.forum/impulse/feed.json",
        "items": items,
        "fetched_at": datetime.now(timezone.utc).isoformat()
    }

    Path("impulse").mkdir(parents=True, exist_ok=True)
    Path("impulse/feed.json").write_text(
        json.dumps(out, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

if __name__ == "__main__":
    main()
