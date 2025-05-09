const params = new URLSearchParams(window.location.search);
const albumId = params.get("album");
const apiUrl = `https://www.theaudiodb.com/api/v1/json/523532/album.php?m=${albumId}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const album = data.album[0];
    const container = document.getElementById("vinylDetail");

    // ✨ 创建圆形排布的文字
    const rawText = album.strDescriptionEN || 'No description available.';
    const words = rawText.split(' ');
    const lines = [];
    let currentLine = [];

    words.forEach(word => {
      currentLine.push(word);
      if (currentLine.length >= 8) {
        lines.push(currentLine.join(' '));
        currentLine = [];
      }
    });
    if (currentLine.length) lines.push(currentLine.join(' '));

    const totalLines = lines.length;
    const curvedHTML = lines.map((line, i) => {
      const progress = Math.abs(i - totalLines / 2) / (totalLines / 2); // 0 到 1
      const widthPercent = 90 - progress * 40; // 从90% 缩到 50%
      return `<span style="display:block; max-width:${widthPercent}%; margin: 0 auto;">${line}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="vinyl-detail-wrapper">
        <img class="vinyl-base" src="Vinyl.png" alt="Vinyl">
        <div class="album-overlay">
          <img src="${album.strAlbumThumb}" alt="${album.strAlbum}">
        </div>
        <div class="album-info-full">
          <h2>${album.strAlbum}</h2>
          <p><strong>Year:</strong> ${album.intYearReleased}</p>
          <p class="curved-text">${curvedHTML}</p>
        </div>
      </div>
    `;
  })
  .catch(err => {
    document.getElementById("vinylDetail").textContent = "Failed to load album.";
    console.error(err);
  });
