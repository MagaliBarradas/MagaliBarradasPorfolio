from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from PIL import Image
import textwrap

ROOT = Path(r"C:\Users\magal\Desktop\CESAE\MagaliBarradasPorfolio")
ASSETS = Path(r"C:\Users\magal\Desktop\DESIGN")
OUT = ROOT / "output" / "pdf" / "casa-da-arvore-brand-presentation.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = 1600, 1000
INK = HexColor("#26291C")
MOSS = HexColor("#9EAE8C")
SAGE = HexColor("#BCC8AD")
SAND = HexColor("#DADAC6")
CREAM = HexColor("#F5F1E8")
WHITE = HexColor("#FFFEFA")
FOREST = HexColor("#314733")
TAUPE = HexColor("#A58E73")

pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))
pdfmetrics.registerFont(TTFont("Segoe", r"C:\Windows\Fonts\segoeui.ttf"))
pdfmetrics.registerFont(TTFont("Segoe-Light", r"C:\Windows\Fonts\segoeuil.ttf"))
pdfmetrics.registerFont(TTFont("Segoe-Bold", r"C:\Windows\Fonts\segoeuib.ttf"))

logo = ASSETS / "casa-da-arvore-logo.png"
hero = ASSETS / "casa-da-arvore.jpg"
mockups = ASSETS / "-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-i-m-a-g-e-f3e4f842-aff7-4119-bc93-103b31eb71ff.png"

def bg(c, color):
    c.setFillColor(color); c.rect(0, 0, W, H, fill=1, stroke=0)

def text(c, s, x, y, size, font="Segoe", color=INK, tracking=None):
    c.setFillColor(color); c.setFont(font, size)
    if tracking is None:
        c.drawString(x, y, s)
    else:
        t = c.beginText(x, y); t.setFont(font, size); t.setCharSpace(tracking); t.textOut(s); c.drawText(t)

def para(c, s, x, y, width, size=25, leading=38, font="Segoe-Light", color=INK):
    approx = max(10, int(width / (size * 0.52)))
    yy = y
    for p in s.split("\n"):
        lines = textwrap.wrap(p, width=approx) if p else [""]
        for line in lines:
            text(c, line, x, yy, size, font, color); yy -= leading
        yy -= leading * .35
    return yy

def label(c, s, x, y, color=INK):
    text(c, s.upper(), x, y, 17, "Segoe-Bold", color, 2.8)

def page_no(c, n, light=False):
    col = CREAM if light else INK
    text(c, f"CASA DA ÁRVORE  /  {n:02d}", 86, 48, 13, "Segoe", col, 1.4)

def image_cover(c, path, x, y, w, h, align="center"):
    im = Image.open(path); iw, ih = im.size
    scale = max(w / iw, h / ih); nw, nh = iw * scale, ih * scale
    dx = x + (w - nw)/2
    dy = y + (h - nh)/2
    c.saveState(); p = c.beginPath(); p.rect(x, y, w, h); c.clipPath(p, stroke=0, fill=0)
    c.drawImage(str(path), dx, dy, nw, nh, mask="auto")
    c.restoreState()

def image_contain(c, path, x, y, w, h, pad=0):
    im = Image.open(path); iw, ih = im.size
    scale = min((w-2*pad)/iw, (h-2*pad)/ih); nw, nh = iw*scale, ih*scale
    c.drawImage(str(path), x+(w-nw)/2, y+(h-nh)/2, nw, nh, mask="auto")

c = canvas.Canvas(str(OUT), pagesize=(W,H))
c.setTitle("Casa da Árvore - Apresentação de Identidade Visual")
c.setAuthor("Magali Barradas")

# 01 Cover
bg(c, CREAM)
c.setFillColor(SAGE); c.circle(1260, 710, 360, fill=1, stroke=0)
c.setStrokeColor(INK); c.setLineWidth(2); c.line(1060, 0, 1440, 1000)
image_contain(c, logo, 790, 215, 720, 650)
label(c, "Identidade visual", 90, 865)
text(c, "Casa da", 90, 640, 84, "Georgia", INK)
text(c, "Árvore", 90, 535, 118, "Georgia-Bold", INK)
para(c, "Uma marca de hospitalidade que vive\nentre a sombra e o mar.", 95, 410, 570, 28, 43, "Segoe-Light", INK)
page_no(c, 1); c.showPage()

# 02 Premise
bg(c, INK)
label(c, "O ponto de partida", 90, 865, SAND)
text(c, "Um lugar que", 90, 665, 78, "Georgia", CREAM)
text(c, "se sente antes", 90, 570, 78, "Georgia", CREAM)
text(c, "de se explicar.", 90, 475, 78, "Georgia", MOSS)
para(c, "Casa da Árvore nasce do encontro entre abrigo, natureza e proximidade com o mar. A identidade procura traduzir essa experiência com um gesto simples: linhas orgânicas, silêncio visual e uma paleta inspirada na paisagem.", 920, 680, 545, 27, 42, "Segoe-Light", CREAM)
c.setStrokeColor(MOSS); c.setLineWidth(5); c.line(920, 430, 1430, 430)
text(c, "ACOLHIMENTO", 920, 365, 17, "Segoe-Bold", SAND, 2.5)
text(c, "NATUREZA", 920, 305, 17, "Segoe-Bold", SAND, 2.5)
text(c, "SERENIDADE", 920, 245, 17, "Segoe-Bold", SAND, 2.5)
page_no(c, 2, True); c.showPage()

# 03 Concept map
bg(c, WHITE)
label(c, "Conceito", 90, 865)
text(c, "Entre a sombra e o mar", 90, 760, 64, "Georgia", INK)
para(c, "A marca combina três ideias essenciais. Juntas, criam uma assinatura com caráter artesanal, íntimo e memorável.", 92, 675, 980, 26, 39, "Segoe-Light")
cards = [
    (90, "01", "ABRIGO", "A casa é sugerida por poucos traços e uma janela: presença humana sem excesso de detalhe."),
    (590, "02", "NATUREZA", "A copa da árvore e a pequena forma vegetal constroem uma relação direta com o lugar."),
    (1090, "03", "HORIZONTE", "A linha contínua prolonga o olhar e evoca o percurso entre terra, sombra e mar."),
]
for x,n,tit,body in cards:
    c.setFillColor(CREAM); c.roundRect(x, 170, 420, 380, 18, fill=1, stroke=0)
    text(c, n, x+35, 485, 18, "Segoe-Bold", MOSS, 2)
    text(c, tit, x+35, 405, 24, "Segoe-Bold", INK, 1.5)
    para(c, body, x+35, 335, 345, 22, 34, "Segoe-Light")
page_no(c, 3); c.showPage()

# 04 Symbol anatomy
bg(c, SAND)
label(c, "Anatomia do símbolo", 90, 865)
text(c, "Um desenho, várias leituras", 90, 770, 62, "Georgia", INK)
c.setFillColor(WHITE); c.roundRect(90, 105, 870, 585, 22, fill=1, stroke=0)
image_contain(c, logo, 135, 145, 780, 510)
items = [
    (1040, 620, "COPA", "Forma orgânica que introduz sombra, proteção e proximidade com a natureza."),
    (1040, 430, "CASA + JANELA", "A arquitetura surge por sugestão, preservando leveza e personalidade."),
    (1040, 240, "LINHA DE BASE", "O gesto inclinado cria movimento e remete ao horizonte da paisagem."),
]
for x,y,tit,body in items:
    c.setFillColor(MOSS); c.circle(x, y+8, 8, fill=1, stroke=0)
    text(c, tit, x+28, y, 19, "Segoe-Bold", INK, 1.3)
    para(c, body, x+28, y-45, 430, 20, 31, "Segoe-Light")
page_no(c, 4); c.showPage()

# 05 Palette
bg(c, WHITE)
label(c, "Paleta cromática", 90, 865)
text(c, "Cores retiradas da paisagem", 90, 765, 62, "Georgia", INK)
para(c, "Verdes dessaturados, neutros minerais e um tom profundo criam uma atmosfera tranquila e sofisticada. A paleta evita contrastes agressivos e privilegia materiais naturais.", 92, 680, 1080, 25, 38, "Segoe-Light")
swatches = [
    (INK, "PINHO", "#26291C", "estrutura e contraste"),
    (MOSS, "SÁLVIA", "#9EAE8C", "natureza e calma"),
    (SAND, "AREIA", "#DADAC6", "luz e suavidade"),
    (CREAM, "CALCÁRIO", "#F5F1E8", "base e respiro"),
]
for i,(col,name,hx,desc) in enumerate(swatches):
    x=90+i*375
    c.setFillColor(col); c.roundRect(x, 230, 325, 285, 16, fill=1, stroke=0)
    tc = CREAM if i==0 else INK
    text(c, name, x+25, 180, 18, "Segoe-Bold", INK, 1.5)
    text(c, hx, x+25, 140, 16, "Segoe", INK)
    text(c, desc, x+25, 105, 15, "Segoe-Light", INK)
page_no(c, 5); c.showPage()

# 06 Typography
bg(c, FOREST)
label(c, "Sistema tipográfico", 90, 865, SAND)
text(c, "Editorial no nome.", 90, 700, 76, "Georgia", CREAM)
text(c, "Contemporâneo na voz.", 90, 605, 58, "Georgia", MOSS)
para(c, "A serifada transmite acolhimento, tradição e cuidado. O contraste dos traços dá ao nome uma presença elegante e humana.\n\nNa assinatura e nos textos de apoio, uma sans serif leve cria clareza, equilíbrio e uma leitura atual.", 930, 680, 545, 25, 39, "Segoe-Light", CREAM)
text(c, "Casa da Árvore", 90, 340, 76, "Georgia", CREAM)
text(c, "ENTRE A SOMBRA E O MAR", 95, 250, 19, "Segoe-Light", SAND, 5.2)
page_no(c, 6, True); c.showPage()

# 07 Flexibility
bg(c, CREAM)
label(c, "Assinatura principal", 90, 865)
text(c, "Leve, reconhecível, versátil", 90, 770, 62, "Georgia", INK)
c.setFillColor(WHITE); c.roundRect(90, 170, 650, 500, 22, fill=1, stroke=0)
image_contain(c, logo, 135, 205, 560, 420)
c.setFillColor(MOSS); c.roundRect(800, 170, 710, 500, 22, fill=1, stroke=0)
image_contain(c, logo, 855, 225, 600, 390)
text(c, "FUNDO CLARO", 112, 120, 15, "Segoe-Bold", INK, 2)
text(c, "FUNDO CROMÁTICO", 822, 120, 15, "Segoe-Bold", INK, 2)
page_no(c, 7); c.showPage()

# 08 Applications full bleed
image_cover(c, mockups, 0, 0, W, H)
c.setFillColor(Color(0.12,0.13,0.09,alpha=.62)); c.rect(0, 780, W, 220, fill=1, stroke=0)
label(c, "Aplicações", 90, 920, SAND)
text(c, "Uma identidade que vive nos detalhes", 90, 835, 51, "Georgia", CREAM)
page_no(c, 8, True); c.showPage()

# 09 Brand behavior
bg(c, SAND)
label(c, "Comportamento da marca", 90, 865)
text(c, "Natural por intenção", 90, 760, 62, "Georgia", INK)
image_cover(c, mockups, 90, 135, 760, 520)
para(c, "Em papel kraft, madeira, cerâmica ou fibras naturais, a identidade ganha textura sem perder legibilidade. A contenção cromática permite que os materiais façam parte da narrativa.", 930, 635, 540, 27, 42, "Segoe-Light")
c.setStrokeColor(MOSS); c.setLineWidth(6); c.line(930, 420, 1445, 420)
text(c, "MENOS RUÍDO.", 930, 350, 20, "Segoe-Bold", INK, 2)
text(c, "MAIS ATMOSFERA.", 930, 295, 20, "Segoe-Bold", INK, 2)
page_no(c, 9); c.showPage()

# 10 Closing
bg(c, INK)
c.setFillColor(MOSS); c.circle(800, 545, 330, fill=1, stroke=0)
image_contain(c, logo, 480, 270, 640, 560)
text(c, "Casa da Árvore", 530, 160, 62, "Georgia", CREAM)
text(c, "ENTRE A SOMBRA E O MAR", 585, 100, 16, "Segoe-Light", SAND, 4.5)
text(c, "IDENTIDADE VISUAL  ·  MAGALI BARRADAS", 90, 48, 13, "Segoe", CREAM, 1.4)
c.showPage()

c.save()
print(OUT)
