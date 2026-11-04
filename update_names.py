#!/usr/bin/env python3
import json

# Charger le fichier JSON
with open('app/(site)/products/json lenze/lenze_motoreducteurs.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Mettre à jour chaque nom de produit avec son header_title correspondant
for product in data:
    if 'header_title' in product:
        product['name'] = product['header_title']

# Écrire les modifications dans le fichier
with open('app/(site)/products/json lenze/lenze_motoreducteurs.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print("Les noms des produits ont été mis à jour avec succès!") 