"""Build ../pets.js from template.js + pets_data.py."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from pets_data import PETS
data = {k: {kk: vv for kk, vv in v.items() if kk not in ("eyes", "head")} for k, v in PETS.items()}
tpl = open(os.path.join(HERE, "template.js"), encoding="utf-8").read()
out = tpl.replace("__PETS__", json.dumps(data, ensure_ascii=False, separators=(",", ":")))
open(os.path.join(HERE, "..", "pets.js"), "w", encoding="utf-8").write(out)
print("pets.js", len(out.encode()), "bytes")

# One-line minified build (copy & paste anywhere). Needs: npm i -g terser
import shutil, subprocess
if shutil.which("terser"):
    src = os.path.join(HERE, "..", "pets.js")
    dst = os.path.join(HERE, "..", "pets.min.js")
    subprocess.run(["terser", src, "-c", "-m", "--comments", "/^!/", "-o", dst], check=True)
    code = open(dst, encoding="utf-8").read().strip().replace("\n", " ")  # truly one line
    open(dst, "w", encoding="utf-8").write(code + "\n")
    print("pets.min.js", os.path.getsize(dst), "bytes, lines:", code.count("\n") + 1)
else:
    print("terser not found: skipped pets.min.js (npm i -g terser)")
