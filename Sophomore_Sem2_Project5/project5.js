// document.getElementById("searchBtn").addEventListener("click", () => {
//   const id = document.getElementById("artistIdInput").value;
//   const url = `https://www.theaudiodb.com/api/v1/json/2/artist.php?i=${id}`;
//   const output = document.getElementById("artistCard");
//   output.innerHTML = "Loading...";

//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       if (!data.artists || data.artists.length === 0) {
//         output.innerHTML = "Artist not found.";
//         return;
//       }

//       const artist = data.artists[0];

//       output.innerHTML = `
//         <div class="card">
//           <img src="${artist.strArtistThumb || ''}" alt="${artist.strArtist}">
//           <h2>${artist.strArtist}</h2>
//           <p><strong>Genre:</strong> ${artist.strGenre || 'N/A'}</p>
//           <p><strong>Style:</strong> ${artist.strStyle || 'N/A'}</p>
//           <p><strong>Country:</strong> ${artist.strCountry || 'N/A'}</p>
//           <p><strong>Born:</strong> ${artist.intBornYear || 'N/A'} | <strong>Formed:</strong> ${artist.intFormedYear || 'N/A'}</p>
//           <p>${artist.strBiographyEN ? artist.strBiographyEN.substring(0, 300) + '...' : 'No biography available.'}</p>
//           ${artist.strFacebook ? `<a href="https://${artist.strFacebook}" target="_blank">🌐 Facebook</a>` : ''}
//         </div>
//       `;
//     })
//     .catch(err => {
//       console.error(err);
//       output.innerHTML = "Error loading artist.";
//     });
// });

document.getElementById("searchBtn").addEventListener("click", () => {
  const artistName = document.getElementById("artistIdInput").value;
  const url = `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${encodeURIComponent(artistName)}`;
  const output = document.getElementById("artistCard");
  output.innerHTML = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.album || data.album.length === 0) {
        output.innerHTML = "No albums found.";
        return;
      }

      const albums = data.album;

      output.innerHTML = albums.map(album => `
        <div class="card">
          <img src="${album.strAlbumThumb || ''}" alt="${album.strAlbum}">
          <h2>${album.strAlbum}</h2>
          <p><strong>Artist:</strong> ${album.strArtist}</p>
          <p><strong>Genre:</strong> ${album.strGenre || 'N/A'}</p>
          <p><strong>Year:</strong> ${album.intYearReleased || 'N/A'}</p>
          <p>${album.strDescriptionEN ? album.strDescriptionEN.substring(0, 300) + '...' : 'No description available.'}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      output.innerHTML = "Error fetching album data.";
    });
});
