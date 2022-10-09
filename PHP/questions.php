<?php
include './db.php';

if ($_GET['f'] == 'getQuestions') {
  for ($index = 1; $index <= 8; $index++) {

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
              answers.id,
              answers.Answer,
              answers.Correct
        FROM  answers
        WHERE answers.QuestionId = ?
        LIMIT 4
    ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->bind_result($aId, $answer, $correct);
    while ($stmt->fetch()) {
      $answers[] = array(
        'answerId' => $aId,
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
  print_r($_GET);
  $sql = "
    UPDATE questions
    SET Question = ?
    WHERE Id = ?";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('si', $_GET['question'], $_GET['id']);
  $stmt->execute();
  $stmt->close();

  $answerArray = [$_GET['answerA'], $_GET['answerB'], $_GET['answerC'], $_GET['answerD']];
  foreach ($answerArray as $answer) {
    $answer = str_replace("[", "", $answer);
    $answer = str_replace("]", "", $answer);



    $answer = explode(",", $answer);
    $answerId = $answer[0];
    $answerText = $answer[1];

    echo "<br>" . $answerId . " " . $answerText;
    $sql = "
    UPDATE answers
    SET Answer = ?
    WHERE Id = ?
  ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('si', $answerText, $answerId);
    $stmt->execute();
    $stmt->close();
  }
  $sql = "
    UPDATE answers
    SET Correct = 0
    WHERE QuestionId = ?
    ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $_GET['id']);
  $stmt->execute();
  $stmt->close();

  $sql = "
    UPDATE answers
    SET Correct = 1
    WHERE Id = ?
    ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $_GET['correctAwnserId']);
  $stmt->execute();
  $stmt->close();
}

if ($_GET['f'] == 'getQuestion') {
  $sql = "
  SELECT  questions.Id,
          questions.Question
  FROM questions
  WHERE questions.Id = ?
  ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $_GET["id"]);
  $stmt->execute();
  $stmt->bind_result($id, $question);
  $stmt->fetch();
  $stmt->close();

  $sql = "
      SELECT 
            answers.id, 
            answers.Answer,
            answers.Correct
      FROM  answers
      WHERE answers.QuestionId = ?
      LIMIT 4
  ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $id);
  $stmt->execute();
  $stmt->bind_result($aId, $answer, $correct);
  while ($stmt->fetch()) {
    $answers[] = array(
      'answerId' => $aId,
      'answer' => $answer,
      'isCorrect' => $correct
    );
  }
  $stmt->close();
  $questions[] = array('id' => $id, 'question' => $question, 'answers' => $answers);

  echo json_encode($questions);
}

if ($_GET['f'] == 'getHighscoreBoard') {
  $sql = "
    SELECT  *
    FROM highscore
    ORDER BY Score DESC
    Limit 20
  ";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $stmt->bind_result($id, $name, $score);
  while ($stmt->fetch()) {
    $score[] = array('id' => $id, 'name' => $name, 'score' => $score);
  }
  $stmt->close();

  echo json_encode($score);
}
