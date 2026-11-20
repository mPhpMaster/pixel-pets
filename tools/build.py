"""Build ../pets.js from template.js + pets_data.py."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from pets_data import PETS
data = {k: {kk: vv for kk, vv in v.items() if kk not in ("eyes", "head")} for k, v in PETS.items()}
tpl = open(os.path.join(HERE, "template.js"), encoding="utf-8").read()
out = tpl.replace("__PETS__", json.dumps(data, ensure_ascii=False, separators=(",", ":")))
open(os.path.join(HERE, "..", "pets.js"), "w", encoding="utf-8").write(out)
print("pets.js", len(out.encode()), "bytes")
