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
const cheminAlbums = 'Album';

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
let nomAlbum;
let pistes;
// Définissez une variable globale pour suivre l'index de la piste actuelle
let indexPisteActuelle = 0;

function chargerPlaylist(nomAlbumtemp) {
    nomAlbum = nomAlbumtemp;
    indexPisteActuelle = 0;
    const cheminListe = `Album/${nomAlbum}/list.json`;
    // Utilisez fetch pour récupérer le fichier JSON
    fetch(cheminListe)
        .then(response => response.json())
        .then(data => {
        pistes = data.pistes;
        afficherPlaylist(0);
    })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON', error));
}


function afficherPlaylist(index) {
    console.log(index);

    // Assurez-vous que l'index est dans les limites de la liste des pistes
    if (index >= 0 && index < pistes.length) {
        // Désactivez le bouton pendant le traitement
        document.getElementById('boutonPasser').disabled = true;
        document.getElementById('boutonReculer').disabled = true;

        // Obtenez l'élément de la playlist avec l'index donné
        const premierTitre = pistes[index];

        // Créez une div pour afficher les informations du premier titre
        const premierTitreDiv = document.createElement('div');
        premierTitreDiv.innerHTML = `<h2>${nomAlbum}</h2>`;
        premierTitreDiv.innerHTML += `<p>${premierTitre.titre} - ${premierTitre.auteur}</p>`;

        // Ajoutez la div du premier titre à l'élément de votre choix dans votre interface
        const playlistContainer = document.getElementById('playlistContainer');
        playlistContainer.innerHTML = '';
        playlistContainer.appendChild(premierTitreDiv);

        // Lancez l'écoute du premier morceau
        lancerEcoute(premierTitre);

        // Réactivez le bouton après le traitement
        document.getElementById('boutonPasser').disabled = false;
        document.getElementById('boutonReculer').disabled = false;
    } else {
        console.error('L\'index est en dehors des limites de la liste des pistes.');
    }
}



function lancerEcoute(titre) {
    const lecteurAudio = document.getElementById('lecteurAudio');
    const boutonPlay = document.getElementById('boutonPlay');
    const boutonPasser = document.getElementById('boutonPasser');
    const boutonReculer = document.getElementById('boutonReculer');
    const barreDeTemps = document.getElementById('barreDeTemps');

    function mettreAJourBarreDeTemps() {
        const pourcentage = (lecteurAudio.currentTime / lecteurAudio.duration) * 100;
        barreDeTemps.value = pourcentage;
    }

    function passerPisteSuivante() {
        // Vérifier si une opération de passage est déjà en cours
        if (enCoursDePassage) {
            return;
        }

        // Désactiver la possibilité de passer pendant cette opération
        enCoursDePassage = true;

        indexPisteActuelle = (indexPisteActuelle + 1) % pistes.length;
        jouerPisteActuelle();

        // Activer à nouveau la possibilité de passer après un court délai
        setTimeout(() => {
            enCoursDePassage = false;
        }, 1000); // Ajoutez un délai d'1 seconde (ajustable si nécessaire)
    }

    function reculerPistePrecedente() {
         if (enCoursDePassage) {
            return;
        }

        // Désactiver la possibilité de passer pendant cette opération
        enCoursDePassage = true;
        
        indexPisteActuelle = (indexPisteActuelle - 1 + pistes.length) % pistes.length;
        jouerPisteActuelle();
        
        setTimeout(() => {
            enCoursDePassage = false;
        }, 1000); // Ajoutez un délai d'1 seconde (ajustable si nécessaire)
    }

    function jouerPisteActuelle() {
        afficherPlaylist(indexPisteActuelle);
    }

    function ajusterTemps() {
        const pourcentage = barreDeTemps.value / 100;
        lecteurAudio.currentTime = pourcentage * lecteurAudio.duration;
    }

    function toggleLecture() {
        if (lecteurAudio.paused) {
            lecteurAudio.play();
        } else {
            lecteurAudio.pause();
        }
    }

    let enCoursDePassage = false; // Nouvelle variable pour éviter les appels multiples

    // Retirer tous les écouteurs d'événements
    lecteurAudio.removeEventListener('loadedmetadata', mettreAJourBarreDeTemps);
    lecteurAudio.removeEventListener('timeupdate', mettreAJourBarreDeTemps);
    lecteurAudio.removeEventListener('ended', passerPisteSuivante);
    boutonPlay.removeEventListener('click', toggleLecture);
    boutonPasser.removeEventListener('click', passerPisteSuivante);
    boutonReculer.removeEventListener('click', reculerPistePrecedente);
    barreDeTemps.removeEventListener('input', ajusterTemps);

    // Assurer que l'index reste dans les limites
    indexPisteActuelle = Math.max(0, Math.min(indexPisteActuelle, pistes.length - 1));

    lecteurAudio.src = `Album/${titre.album}/${titre.titre}.mp3`;

    lecteurAudio.addEventListener('loadedmetadata', () => {
        barreDeTemps.max = lecteurAudio.duration;
        mettreAJourBarreDeTemps();
    });

    lecteurAudio.addEventListener('timeupdate', mettreAJourBarreDeTemps);
    lecteurAudio.addEventListener('ended', passerPisteSuivante);
    boutonPlay.addEventListener('click', toggleLecture);
    boutonPasser.addEventListener('click', passerPisteSuivante);
    boutonReculer.addEventListener('click', reculerPistePrecedente);
    barreDeTemps.addEventListener('input', ajusterTemps);

    lecteurAudio.play();
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
