function True() {
    const pseudo = document.getElementById("inputPseudo").value;
    if (pseudo !== "") {
      document.getElementById("contenu").style.display = "block";
      document.getElementById("popup").style.display = "none";
      document.getElementById("pseudo").textContent = pseudo;
    } else {
      alert("Veuillez saisir un pseudo.");
    }
  }