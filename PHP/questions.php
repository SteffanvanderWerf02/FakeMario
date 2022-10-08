<?php
include './db.php';

if ($_GET['f'] == 'getQuestions') {
  for ($index = 1; $index <= 2; $index++) {

    $sql = "
    SELECT  questions.Id,
            questions.Question
    FROM questions
    WHERE questions.Id = ?
  ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i', $index);
    $stmt->execute();
    $stmt->bind_result($id, $question);
    $stmt->fetch();
    $stmt->close();

    $sql = "
        SELECT  
              answers.Answer,
              answers.Correct
        FROM  answers
        WHERE answers.QuestionId = ?
        LIMIT 4
    ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($answer, $correct);
    while ($stmt->fetch()) {
      $answers[] = array(
        'answer' => $answer,
        'isCorrect' => $correct
      );
    }
    $stmt->close();
    $questions[] = array('id' => $id, 'question' => $question, 'answers' => $answers);
    unset($answers);
  }
  echo json_encode($questions);
}

if ($_GET['f'] == 'editQuestion') {
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
