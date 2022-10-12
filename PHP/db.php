<?php
// Database connection
$mysqli = new mysqli("localhost", "root", "", "fakeMario");
if ($mysqli->connect_error) {
  exit('Could not connect');
}
