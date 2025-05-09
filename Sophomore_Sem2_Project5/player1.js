// player1.js
document.getElementById("searchBtn").addEventListener("click", () => {
    const artist = document.getElementById("artistInput").value;
    if (artist) {
      window.location.href = `player2.html?artist=${encodeURIComponent(artist)}`;
    }
  });
  