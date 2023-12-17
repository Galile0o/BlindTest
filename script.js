let points = 0;

function jouerExtrait() {
    // Ici, vous devriez mettre le code pour jouer un extrait de chanson via l'API Spotify
    // N'oubliez pas de mettre à jour le score en fonction de la réponse du joueur
    // (Simulé ici avec une réponse correcte à des fins de démonstration)
    const reponseCorrecte = true;
    attribuerPoints(reponseCorrecte);
}

function attribuerPoints(reponseCorrecte) {
    if (reponseCorrecte) {
        points += 1;
    } else {
        points -= 1;
    }

    document.getElementById("points").innerText = "Points : " + points;
}
let nbEquipes;  // Déclarez la variable en dehors de toute fonction

// Ajoutez ces lignes pour générer les champs de texte dans la fonction creerEquipes()
function creerEquipes() {
    nbEquipes = document.getElementById("nbEquipes").value; // Utilisez la variable globale

    if (nbEquipes >= 1) {
        const champsEquipesDiv = document.getElementById("champsEquipes");
        champsEquipesDiv.innerHTML = ""; // Réinitialise les champs de texte

        for (let i = 1; i <= nbEquipes; i++) {
            const champEquipe = document.createElement("input");
            champEquipe.type = "text";
            champEquipe.placeholder = `Nom de l'équipe ${i}`;
            champEquipe.id = `equipe${i}`;

            champsEquipesDiv.appendChild(champEquipe);
        }
    } else {
        alert("Veuillez entrer un nombre valide d'équipes (au moins 1).");
    }
}

function envoyerVersPrincipal() {
    let nomsEquipes = [];
    
    if (nbEquipes < 2) {
        alert("Veuillez entrer au moins deux équipes.");
        return;
    }
    const victimeChoisie = document.getElementById("victimeSelectionnee");
    console.log("Valeur actuelle de victimeChoisie.value :", victimeChoisie.value);
     if (!victimeChoisie.value) {
        victimeChoisie.textContent = `Victime choisie : Maxime`;
        return
    }
    
    for (let i = 1; i <= nbEquipes; i++) {
        const champEquipe = document.getElementById(`equipe${i}`);
        nomsEquipes.push(champEquipe.value || `Équipe ${i}`);
    }

    // Redirige vers la page principale avec les noms d'équipe en paramètre d'URL
    window.location.href = `BlindTest.html?equipes=${encodeURIComponent(JSON.stringify(nomsEquipes))}`;
}


function recupererNomsEquipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomsEquipesEncoded = urlParams.get("equipes");

    if (nomsEquipesEncoded) {
        return JSON.parse(decodeURIComponent(nomsEquipesEncoded));
    }

    // Retourne un tableau vide par défaut
    return [];
}


function recupererNomsEquipes() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomsEquipesEncoded = urlParams.get("equipes");

    if (nomsEquipesEncoded) {
        return JSON.parse(decodeURIComponent(nomsEquipesEncoded));
    }

    // Retourne un tableau vide par défaut
    return [];
}

document.addEventListener("DOMContentLoaded", function() {
    const joueurs = ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4", "Joueur 5"];

    const choisirVictimeButton = document.getElementById("choisirVictime");
    const victimeSelectionneeElement = document.getElementById("victimeSelectionnee");

    choisirVictimeButton.addEventListener("click", function() {
        const victime = choisirVictimeAleatoire(joueurs);
        victimeSelectionneeElement.textContent = `Victime choisie : ${victime}`;
    });

    function choisirVictimeAleatoire(joueurs) {
        // TODO: Implémentez votre logique de choix ici
        // Pour l'instant, c'est simplement un choix aléatoire
        return joueurs[Math.floor(Math.random() * joueurs.length)];
    }
});

