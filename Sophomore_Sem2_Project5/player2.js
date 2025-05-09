const urlParams = new URLSearchParams(window.location.search);
const artistName = urlParams.get("artist");
const apiURL = `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${encodeURIComponent(artistName)}`;

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById("vinylGallery");
    if (!data.album) {
      gallery.innerHTML = "No albums found.";
      return;
    }

    data.album.forEach(album => {
      const wrapper = document.createElement("div");
      wrapper.className = "vinyl-wrapper";

      wrapper.innerHTML = `
        <img class="vinyl-base" src="Vinyl.png" alt="Vinyl">
        <div class="album-overlay">
          <img src="${album.strAlbumThumb || 'https://via.placeholder.com/150'}" alt="${album.strAlbum}">
        </div>
        <div class="album-info">
          <h3>${album.strAlbum}</h3>
          <p><strong>Year:</strong> ${album.intYearReleased || 'N/A'}</p>
          <p>${album.strDescriptionEN ? album.strDescriptionEN.substring(0, 200) + '...' : 'No description available.'}</p>
        </div>
      `;

      wrapper.addEventListener("click", () => {
        // window.location.href = `player3.html?album=${album.idAlbum}`;
        window.open(`player3.html?album=${album.idAlbum}`, '_blank');

      });

      gallery.appendChild(wrapper);
    });
  })
  .catch(err => {
    document.getElementById("vinylGallery").textContent = "Error loading albums.";
    console.error(err);
  });


