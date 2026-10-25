"""Pinned offline PNG export. No provisioning or external navigation at invocation."""
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import sys


def main():
    expected = {"playwright": "1.64.0", "greenlet": "3.5.6", "pyee": "14.0.0", "typing-extensions": "4.16.0"}
    for name, version in expected.items():
        if importlib.metadata.version(name) != version:
            raise ValueError(f"Unapproved package version: {name}; provision the reviewed tuple separately")
    import playwright
    from playwright.sync_api import sync_playwright
    manifest = json.loads((Path(playwright.__file__).parent / "driver/package/browsers.json").read_text())
    shell = next(x for x in manifest["browsers"] if x["name"] == "chromium-headless-shell")
    if shell["revision"] != "1248" or shell["browserVersion"] != "156.0.8078.4":
        raise ValueError("Unapproved browser manifest")
    source, target = Path(sys.argv[1]), Path(sys.argv[2])
    width, height = int(sys.argv[3]), int(sys.argv[4])
    if target.exists() or not 1 <= width <= 1600 or not 1 <= height <= 16000:
        raise ValueError("Invalid PNG destination or dimensions")
    if not os.environ.get("PLAYWRIGHT_BROWSERS_PATH"):
        raise ValueError("Explicit browser cache required")
    blocked = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            if browser.version != "156.0.8078.4":
                raise ValueError("Browser launch version mismatch")
            context = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1,
                                          java_script_enabled=False, service_workers="block", offline=True)
            def reject(route):
                blocked.append(route.request.url)
                route.abort()
            context.route("**/*", reject)
            page = context.new_page()
            # Content comes from the validated staging file; file:// navigation is unnecessary.
            page.set_content(source.read_text(encoding="utf-8"), wait_until="load")
            page.screenshot(path=str(target), omit_background=True, animations="disabled")
            if blocked:
                raise ValueError("Unexpected resource request in validated static output")
            print(json.dumps({"packages": expected, "browser_version": browser.version,
                              "browser_revision": "1248", "offline": True, "javascript_enabled": False,
                              "blocked_requests": blocked, "png_sha256": hashlib.sha256(target.read_bytes()).hexdigest()}))
        finally:
            browser.close()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"PNG export rejected: {error}", file=sys.stderr)
        sys.exit(1)
