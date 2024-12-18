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
if [[ ! -f "src/challenges/day$DAY.challenge.ts" ]]; then
  echo "Erreur : Le fichier src/challenges/day$DAY.challenge.ts n'existe pas."
  exit 1
fi

# Lancer tsc en mode watch et nodemon pour surveiller les changements
echo "Lancement de tsc en mode watch et nodemon..."
npx tsc --watch &
npx nodemon dist/challenges/day$DAY.challenge.js