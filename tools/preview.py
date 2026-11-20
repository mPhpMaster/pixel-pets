import sys; sys.path.insert(0,'.')
from PIL import Image, ImageDraw
from pets_data import PETS
S=6; order=["idle","move1","move2","blink","bob"]
rows=[(k,pal) for k,p in PETS.items() for pal in p["palettes"]]
img=Image.new("RGB",(len(order)*17*S, len(rows)*17*S),"#cfd8dc"); d=ImageDraw.Draw(img)
for j,(k,pal) in enumerate(rows):
    P=PETS[k]["palettes"][pal]
    for i,n in enumerate(order):
        for y,row in enumerate(PETS[k]["sprites"][n]):
            for x,c in enumerate(row):
                if c!=".": d.rectangle([i*17*S+x*S,j*17*S+y*S,i*17*S+x*S+S-1,j*17*S+y*S+S-1],fill=P[c])
img.save(sys.argv[1] if len(sys.argv)>1 else "/tmp/pets_preview.png")
