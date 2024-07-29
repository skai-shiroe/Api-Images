let currentPage = 1;
const numResults = 10;

document.getElementById('searchBtn').addEventListener('click', function(e) {
    currentPage = 1;
    rechercherImages();
});

document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        rechercherImages();
    }
});

document.getElementById('nextBtn').addEventListener('click', function() {
    currentPage++;
    rechercherImages();
});

function rechercherImages() {
    var termeRecherche = document.getElementById('searchInput').value;
    var cx = '0374e8d2115ee4cbd'; 
    var apiKey = 'AIzaSyDFVDMOu5tyLTuw-PIoSIXY7dZvWrbxgjE';
    var startIndex = (currentPage - 1) * numResults + 1;

    var url = 'https://www.googleapis.com/customsearch/v1?q=' + termeRecherche + '&cx=' + cx + '&searchType=image&key=' + apiKey + '&start=' + startIndex + '&num=' + numResults;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        var images = data.items;
        var conteneurAperçu = document.getElementById('preview');
        conteneurAperçu.innerHTML = '';

        if (images) {
            images.forEach(function(image) {
                var conteneurImage = document.createElement('div');
                conteneurImage.className = 'image-container';
                var élémentImage = document.createElement('img');
                élémentImage.src = image.link;
                élémentImage.alt = image.title;
                élémentImage.loading = 'lazy';
                conteneurImage.appendChild(élémentImage);

                var lienAffichage = document.createElement('button');
                lienAffichage.className = 'btn show-link';
                lienAffichage.textContent = 'Afficher';
                lienAffichage.addEventListener('click', function() {
                    openModal(image.link);
                });
                conteneurImage.appendChild(lienAffichage);

                var lienTéléchargement = document.createElement('a');
                lienTéléchargement.href = image.link;
                lienTéléchargement.download = 'image.jpg';

                var btnTéléchargement = document.createElement('button');
                btnTéléchargement.className = 'btn download-link';
                btnTéléchargement.textContent = 'Télécharger';
                btnTéléchargement.addEventListener('click', function() {
                    lienTéléchargement.click();
                });

                conteneurImage.appendChild(btnTéléchargement);

                conteneurAperçu.appendChild(conteneurImage);
            });

            document.getElementById('pagination').style.display = 'block';
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = images.length < numResults;
        } else {
            conteneurAperçu.innerHTML = '<p>Aucune image trouvée.</p>';
            document.getElementById('pagination').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des images:', error);
    });
}

function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    var modalDownloadBtn = document.getElementById("modalDownloadBtn");
    
    modal.style.display = "block";
    modalImage.src = imageSrc;
    modalDownloadBtn.href = imageSrc;
}

document.querySelector(".close-btn").addEventListener("click", function() {
    document.getElementById("imageModal").style.display = "none";
});

window.onclick = function(event) {
    var modal = document.getElementById("imageModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
