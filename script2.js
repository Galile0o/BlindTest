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
// Obtenez la référence de la div où vous afficherez les albums
const listeAlbums = document.getElementById('listeAlbums');

// Chemin vers le dossier principal des albums
const cheminAlbums = '/BlindTest/Album';

// Chargez dynamiquement la liste des albums
function chargerAlbums() {
   // Utilisez une méthode pour obtenir la liste des albums (par exemple, AJAX ou fetch)
   // En supposant que vous avez déjà une liste des noms d'albums
   const albums = ['mix', 'moderat'];

   // Créez les éléments HTML pour chaque album
   albums.forEach((album) => {
      const elementAlbum = document.createElement('div');
      elementAlbum.classList.add('album');
      elementAlbum.innerHTML = `<img src="${cheminAlbums}/${album}/pochette.jpg" alt="${album}" />
                                <p>${album}</p>`;
      elementAlbum.addEventListener('click', () => chargerPlaylist(album));
      listeAlbums.appendChild(elementAlbum);
   });
}
function chargerPlaylist(nomAlbum) {
    const cheminListe = `/BlindTest/Album/${nomAlbum}/list.json`;

    // Utilisez fetch pour récupérer le fichier JSON
    fetch(cheminListe)
        .then(response => response.json())
        .then(data => afficherPlaylist(data))
        .catch(error => console.error('Erreur lors du chargement du fichier JSON', error));
}

function afficherPlaylist(playlist) {
    // Accédez aux données de la playlist (nomAlbum et pistes)
    const nomAlbum = playlist.nomAlbum;
    const pistes = playlist.pistes;

    // Créez une div pour afficher les informations de la playlist
    const playlistInfo = document.createElement('div');
    playlistInfo.innerHTML = `<h2>${nomAlbum}</h2>`;
    
    // Créez une div pour afficher les informations de chaque piste
    const pistesDiv = document.createElement('div');
    
    pistes.forEach(piste => {
        const pisteElement = document.createElement('div');
        pisteElement.innerHTML = `<p>${piste.titre} - ${piste.auteur}</p>`;
        pistesDiv.appendChild(pisteElement);
    });

    // Ajoutez la div des pistes à la div principale de la playlist
    playlistInfo.appendChild(pistesDiv);

    // Ajoutez la div principale à l'élément de votre choix dans votre interface (par exemple, sous la liste des albums)
    const playlistContainer = document.getElementById('playlistContainer'); // Remplacez 'playlistContainer' par l'ID approprié
    playlistContainer.innerHTML = ''; // Assurez-vous de vider le contenu précédent
    playlistContainer.appendChild(playlistInfo);
}


document.addEventListener("DOMContentLoaded", function() {
    const nomsEquipes = recupererNomsEquipes();
    const equipeContainer = document.getElementById("nomsEquipes");

    // Crée un seul élément pour stocker les noms des équipes
    const nomsEquipesElement = document.createElement("div");
    nomsEquipesElement.classList.add("equipe-container");
    
    // Crée un tableau pour stocker les informations sur chaque équipe
    const equipes = nomsEquipes.map((nomEquipe) => ({ nom: nomEquipe, points: 0 }));

    // Affiche les équipes avec leurs points
    afficherEquipes();
    chargerAlbums();
    function afficherEquipes() {
        // Efface le contenu précédent
        nomsEquipesElement.innerHTML = "";

        // Crée et ajoute des éléments HTML pour chaque équipe
        equipes.forEach((equipe, index) => {
            const equipeElement = document.createElement("div");
            equipeElement.classList.add("equipe");

            const nomEquipeElement = document.createElement("span");
            nomEquipeElement.textContent = `${equipe.nom}: `;
            equipeElement.appendChild(nomEquipeElement);



            // Ajoute des boutons pour augmenter/baisser le nombre de points
            const boutonPointsElement = document.createElement("div");
            boutonPointsElement.classList.add("boutonPoints");

            const augmenterPointsButton = document.createElement("button");
            augmenterPointsButton.textContent = "+";
            augmenterPointsButton.addEventListener("click", () => changerPoints(index, 1));
            boutonPointsElement.appendChild(augmenterPointsButton);

            const pointsEquipeElement = document.createElement("div");
            pointsEquipeElement.classList.add("points");
            pointsEquipeElement.textContent = equipe.points;
            equipeElement.appendChild(pointsEquipeElement);

            const baisserPointsButton = document.createElement("button");
            baisserPointsButton.textContent = "-";
            baisserPointsButton.addEventListener("click", () => changerPoints(index, -1));
            boutonPointsElement.appendChild(baisserPointsButton);



            equipeElement.appendChild(boutonPointsElement);

            nomsEquipesElement.appendChild(equipeElement);
        });

        // Ajoute le bloc contenant les noms d'équipe à votre conteneur
        equipeContainer.appendChild(nomsEquipesElement);
    }


    function changerPoints(index, increment) {
        equipes[index].points += increment;
        afficherEquipes();
    }
});
