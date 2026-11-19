"""Remove only the border-connected flat matte from the existing robot renders."""
from collections import deque
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
for name in ("clutch", "challenge"):
    image = Image.open(root / f"public/images/logos/{name}-home.png").convert("RGBA")
    width, height = image.size
    pixels = image.load()
    matte = pixels[0, 0][:3]
    visited = set()
    queue = deque([(x, 0) for x in range(width)] + [(x, height - 1) for x in range(width)]
                  + [(0, y) for y in range(height)] + [(width - 1, y) for y in range(height)])
    while queue:
        x, y = queue.popleft()
        if (x, y) in visited or not (0 <= x < width and 0 <= y < height):
            continue
        visited.add((x, y))
        if max(abs(pixels[x, y][c] - matte[c]) for c in range(3)) > 2:
            continue
        pixels[x, y] = (*pixels[x, y][:3], 0)
        queue.extend(((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)))
    destination = root / f"public/images/logos/{name}-cutout.webp"
    image.save(destination, "WEBP", lossless=True)
    print(f"{name}: {width}x{height}, {destination.stat().st_size:,} bytes")
