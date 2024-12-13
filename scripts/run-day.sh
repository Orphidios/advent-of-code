#!/bin/bash

# Extraire l'argument --day=#
for arg in "$@"; do
  case $arg in
    --day=*)
      DAY="${arg#*=}"
      ;;
  esac
done

if [[ -z "$DAY" ]]; then
  echo "Erreur : Vous devez passer le paramètre --day=#"
  exit 1
fi

# Vérifier si le fichier TypeScript existe
if [[ ! -f "src/challenges/day$DAY/index.ts" ]]; then
  echo "Erreur : Le fichier challenges/day$DAY/index.ts n'existe pas."
  exit 1
fi

# Compiler les fichiers TypeScript
echo "Compilation des fichiers TypeScript..."
npm run build

# Vérifier si le fichier JavaScript compilé existe
if [[ ! -f "dist/challenges/day$DAY/index.js" ]]; then
  echo "Erreur : Le fichier dist/challenges/day$DAY/index.js n'existe pas. Assurez-vous que la compilation a réussi."
  exit 1
fi

# Exécuter le fichier compilé
echo "Exécution du script pour le jour $DAY..."
node dist/challenges/day$DAY/index.js