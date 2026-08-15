#!/usr/bin/env python3
"""Scaffold a new trip: trips/<slug>/_posts/, index.html, and a trips.yml entry.

Usage:
    python3 new_trip.py "New Zealand"
    python3 new_trip.py "New Zealand" --slug nz --display-name "Kiwi Adventure"
    python3 new_trip.py "New Zealand" --dry-run
"""

import argparse
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TRIPS_YML = ROOT / "_data" / "trips.yml"
DEFAULT_COVER = "/images/covers/xx.jpg"

INDEX_TEMPLATE = """---
layout: feed
image: "{cover}"
permalink: "/{slug}/"
start_at_zero: true
---

{{% include trip-feed.html category="{slug}" %}} {{% include adjacent-trips.html %}}
"""


def slugify(name):
    normalized = unicodedata.normalize("NFKD", name)
    ascii_only = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_only).strip("-").lower()
    return slug


def insert_trip_line(text, line):
    """Insert `line` immediately before the last non-blank line of `text`."""
    lines = text.splitlines()
    last_idx = len(lines) - 1
    while last_idx >= 0 and not lines[last_idx].strip():
        last_idx -= 1
    if last_idx < 0:
        lines.append(line)
    else:
        lines.insert(last_idx, line)
    return "\n".join(lines) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", help='Destination name, e.g. "New Zealand"')
    parser.add_argument("--slug", help="Override the auto-derived slug")
    parser.add_argument(
        "--display-name",
        help="Override the nav label (default: destination + current year)",
    )
    parser.add_argument(
        "--cover-image",
        default=DEFAULT_COVER,
        help=f"Cover image path (default: {DEFAULT_COVER})",
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="Print what would happen, change nothing"
    )
    args = parser.parse_args()

    slug = args.slug or slugify(args.destination)
    if not slug:
        sys.exit(
            f"error: could not derive a slug from {args.destination!r}; pass --slug explicitly"
        )
    display_name = args.display_name or f"{args.destination} {date.today().year}"

    trip_dir = ROOT / "trips" / slug
    posts_dir = trip_dir / "_posts"
    index_path = trip_dir / "index.html"
    gitkeep_path = posts_dir / ".gitkeep"

    if trip_dir.exists():
        sys.exit(f"error: {trip_dir.relative_to(ROOT)} already exists")

    trips_yml_text = TRIPS_YML.read_text()
    if re.search(rf"^{re.escape(slug)}:", trips_yml_text, re.MULTILINE):
        sys.exit(f"error: {slug!r} is already a key in {TRIPS_YML.relative_to(ROOT)}")

    trips_yml_line = f"{slug}: {display_name}"
    index_content = INDEX_TEMPLATE.format(cover=args.cover_image, slug=slug)
    new_trips_yml_text = insert_trip_line(trips_yml_text, trips_yml_line)

    print(f"slug:         {slug}")
    print(f"display name: {display_name}")
    print(f"would create: {posts_dir.relative_to(ROOT)}/ (with .gitkeep)")
    print(f"would create: {index_path.relative_to(ROOT)}")
    print(f"would insert into {TRIPS_YML.relative_to(ROOT)}: {trips_yml_line!r}")

    if args.dry_run:
        print("\n(dry run - nothing written)")
        return

    posts_dir.mkdir(parents=True)
    gitkeep_path.write_text("")
    index_path.write_text(index_content)
    TRIPS_YML.write_text(new_trips_yml_text)

    print("\ndone. Next steps:")
    print(
        f"  - add posts under {posts_dir.relative_to(ROOT)}/ (title: + location: front matter, date from filename)"
    )
    print(
        f"  - swap the placeholder cover image ({args.cover_image}) for a real one when you have it"
    )


if __name__ == "__main__":
    main()
