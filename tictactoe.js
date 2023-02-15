$(document).ready(function () {
  // Initialisation de la grille et du joueur
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;
  //Ajout de l'event onClick sur les cells de la grille
  $(".cell").click(function () {
    // On ne change rien si la partie est finie
    if (gameOver) return;
    // Récupération de l'index de la cell onClick
    let index = $(this).index(".cell");
    // On ne change rien si la cell a déja été clickée
    if (board[index] !== "") return;
    // On marque la case comme jouée avec le symbole du currentPlayer + maj de la grille
    board[index] = currentPlayer;
    $(this).text(currentPlayer);
    // Vérifie si la partie est terminée
    checkForWinner();
    // Changement de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
  // Ajout de l'event onClick sur bouton reset
  $("#reset").click(function () {
    // Reset de la grille et du joueur
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    $(".cell").text("");
    $(".cell").css("color", "black");
  });

  /**
   * Fonction qui vérifie si la partie est terminée
   */
  function checkForWinner() {
    // Définitions des combos gagnants
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // Vérifie chaque combo pour voir si il y a un gagnant
    for (let combo of winningCombos) {
      let [a, b, c] = combo;
      // Si la partie est gagnée, affichage du combo et message de victoire
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        $(".cell:eq(" + a + "), .cell:eq(" + b + "), .cell:eq(" + c + ")").css(
          "color",
          "green"
        );
        gameOver = true;
        $("#game-over-message")
          .addClass("alert-success text-center mt-2")
          .text(currentPlayer + " a gagné !");
          setTimeout(function() {
            $('#game-over-message').text('').removeClass('alert-success');
          }, 3000);
      }
    }
    //Si toutes les cells sont remplies il y a égalité
    if (!gameOver && board.filter((cell) => cell === "").length === 0) {
      //Affichage du message d'égalité
      $("#game-over-message")
        .addClass("alert-danger text-center mt-2")
        .text("Egalité !");
        setTimeout(function() {
            $('#game-over-message').text('').removeClass('alert-danger');          }, 3000);
    }
  }
  // Ajout d'event onClick sur le bouton dark mode
  $("#dark-mode-btn").click(function () {
    // Toggle de la classe dark mode
    $("body").toggleClass("dark-mode");
  });
});
