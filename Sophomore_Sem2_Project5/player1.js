// player1.js
document.getElementById("searchBtn").addEventListener("click", () => {
    console.log('user clicked123')
    const artist = document.getElementById("artistInput").value;
    if (artist) {
      window.location.href = `player2.html?artist=${encodeURIComponent(artist)}`;
    }
  });
  
  //这种地方请注意！！！！！！！！！！！！！player2.html
  //不要在前面加上/sophomore project5/player2.html?artist=${encodeURIComponent(artist) 