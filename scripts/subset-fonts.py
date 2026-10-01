#!/usr/bin/env python3
"""
Build the site's self-hosted web fonts from the originals in ~/Library/Fonts.

- Xiangcui Kesong (香萃刻宋, SIL OFL 1.1): Chinese display face, subset to the
  Han characters that appear in content/*.json, so it stays small.
- Compagnon Roman / Light (SIL OFL 1.1): typewriter-ish Latin for museum labels.
- Moniqa Light Display (SIL OFL 1.1, Rajesh Rajput / The Emberly Project): the name on
  the homepage, subset to printable Latin.

Re-run after adding Chinese titles or copy, so every heading has its glyphs:
    pip install fonttools brotli
    python3 scripts/subset-fonts.py
"""
import glob
import os
import re

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.expanduser("~/Library/Fonts")
OUT = os.path.join(ROOT, "assets", "fonts")

# Printable Latin, for faces that only ever set names and short English lines.
LATIN = "".join(chr(c) for c in range(0x20, 0x7F)) + "\u00b7\u2013\u2014\u2019\u00e9"

# Chinese punctuation that headings use, kept even if the content scan misses it.
PUNCTUATION = "，。、；：？！「」『』（）《》〈〉—…·～" + "\u201c\u201d\u2018\u2019"  # curly quotes, escaped


def content_han():
    raw = "".join(open(path, encoding="utf-8").read() for path in glob.glob(os.path.join(ROOT, "content", "*.json")))
    # Some JSON files store Chinese as \uXXXX escapes.
    text = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), raw)
    return sorted(set(ch for ch in text if "㐀" <= ch <= "鿿"))


def build(source_name, out_name, text=None):
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]  # keep copyright and license records
    options.notdef_outline = True
    # Keep the source's timestamp, so re-running with the same text gives byte-identical files.
    font = TTFont(os.path.join(SOURCE, source_name), recalcTimestamp=False)
    subsetter = subset.Subsetter(options)
    if text is None:
        subsetter.populate(unicodes=font.getBestCmap().keys())
    else:
        subsetter.populate(text=text)
    subsetter.subset(font)
    font.flavor = "woff2"
    path = os.path.join(OUT, out_name)
    font.save(path)
    print(f"{out_name}: {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    han = content_han()
    print(f"{len(han)} Han characters found in content/*.json")
    build("xiangcuikesong.ttf", "xiangcui-kesong-subset.woff2", "".join(han) + PUNCTUATION)
    build("Compagnon-Roman.otf", "compagnon-roman.woff2")
    build("Moniqa-LightDisplay.otf", "moniqa-light-display.woff2", LATIN)
    build("Compagnon-Light.otf", "compagnon-light.woff2")
