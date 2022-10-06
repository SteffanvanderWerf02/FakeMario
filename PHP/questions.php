<?php
include './db.php';

if ($_GET['f'] == 'getQuestions') {
  $sql = "SELECT * FROM questions";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  // $stmt->store_result();
  $stmt->bind_result($id, $question, $answer, $wrong1, $wrong2, $wrong3);
  while ($stmt->fetch()) {
    $questions[] = array('id' => $id, 'question' => $question, 'answer' => $answer, 'wrong1' => $wrong1, 'wrong2' => $wrong2, 'wrong3' => $wrong3);
  }
  echo json_encode($questions);
}

if ($_GET['f'] == 'editQuestion') {
  $sql = "UPDATE questions SET question = ?, answer = ?, wrong1 = ?, wrong2 = ?, wrong3 = ? WHERE id = ?";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('sssssi', $_GET["q"], $_GET["a"], $_GET["w1"], $_GET["w2"], $_GET["w3"], $_GET["id"]);
  if ($stmt->execute()) {
    echo "success";
  } else {
    echo "error";
  }

  $stmt->close();
}

if ($_GET['f'] == 'getQuestion') {
  $sql = "SELECT * FROM questions WHERE id = ?";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $_GET["id"]);
  $stmt->execute();
  $stmt->bind_result($id, $question, $answer, $wrong1, $wrong2, $wrong3);
  $stmt->fetch();
  $questions[] = array('id' => $id, 'question' => $question, 'answer' => $answer, 'wrong1' => $wrong1, 'wrong2' => $wrong2, 'wrong3' => $wrong3);

  echo json_encode($questions);
}

// $sql = " SELECT * FROM question";

// $stmt = $mysqli->prepare($sql);
// $stmt->execute();
// $stmt->store_result();
// $stmt->bind_result($id, $question, $answer, $wrong1, $wrong2, $wrong3);

// echo "<table class='table'>";
// echo "<thead>";
// echo "<tr>";
// echo "<th>Nr.</th>";
// echo "<th>Question</th>";
// echo "<th>Good awnser</th>";
// echo "<th>Bad awnser 1</th>";
// echo "<th>Bad awnser 2</th>";
// echo "<th>Bad awnser 3</th>";
// echo "<th>edit</th>";
// echo "</tr>";
// echo "</thead>";
// echo "<tbody>";
// echo "<tr>";
// while ($stmt->fetch()) {
//   echo "<td>" . $id . "</td>";
//   echo "<td>" . $question . "</td>";
//   echo "<td>" . $answer . "</td>";
//   echo "<td>" . $wrong1 . "</td>";
//   echo "<td>" . $wrong2 . "</td>";
//   echo "<td>" . $wrong3 . "</td>";
//   echo "<td class='pointer' id='edit?id=" . $id . "'>edit</td>";
//   echo "</tr>";
// }
// echo "</tbody>";
// echo "</table>";
