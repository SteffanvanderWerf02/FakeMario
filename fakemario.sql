-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2022 at 03:01 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fakemario`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `Id` int(11) NOT NULL,
  `QuestionId` int(11) NOT NULL,
  `Answer` varchar(255) NOT NULL,
  `Correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`Id`, `QuestionId`, `Answer`, `Correct`) VALUES
(1, 1, 'a value that data can be stored in?', 1),
(2, 1, 'a value that can\'t be changed', 0),
(3, 1, 'can i eat is?', 0),
(4, 1, 'a place to put your tears', 0),
(9, 2, 'an European credit', 1),
(10, 2, 'an egg cabin', 0),
(11, 2, 'an early credit', 0),
(12, 2, 'is means Earn it by craft', 0),
(13, 3, '<javascript>', 0),
(14, 3, '<js>', 0),
(15, 3, '<script>', 1),
(16, 3, '<scripting>', 0),
(17, 4, 'Both the <head> section and the <body> section are correct', 1),
(18, 4, 'The <body> section', 0),
(19, 4, 'The <head> section', 0),
(20, 4, 'it is not possible to insert a Javascript block', 0),
(21, 5, 'alertBox(\"Hello World\");', 0),
(22, 5, 'alert(\"Hello World\");', 1),
(23, 5, 'msgBox(\"Hello World\");', 0),
(24, 5, 'msg(\"Hello World\");', 0),
(25, 6, 'function:myFunction()', 0),
(26, 6, 'function = myFunction()', 0),
(27, 6, 'function myFunction()', 1),
(28, 6, 'Function {myfunction()}', 0),
(29, 7, 'function myFunction()', 0),
(30, 7, 'call function myFunction()', 0),
(31, 7, 'call myFunction()', 0),
(32, 7, 'call = myFunction()', 0),
(33, 8, 'w2 = window.open(\"http://www.w3schools.com\");', 1),
(34, 8, ' window.open(\"http://www.w3schools.com\");', 0),
(35, 8, 'window.new(\"http://www.w3schools.com\");', 0),
(36, 8, ' w2 = window.new(\"http://www.w3schools.com\");', 0);

-- --------------------------------------------------------

--
-- Table structure for table `highscore`
--

CREATE TABLE `highscore` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Score` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `Id` int(11) NOT NULL,
  `Question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`Id`, `Question`) VALUES
(1, 'What is an var?'),
(2, 'What is an EC'),
(3, 'Inside which HTML element do we put the JavaScript?'),
(4, 'Where is the correct place to insert a JavaScript?'),
(5, 'How do you write \"Hello World\" in an alert box?'),
(6, 'How do you create a function in JavaScript?'),
(7, 'How do you call a function named \"myFunction\"?'),
(8, 'What is the correct JavaScript syntax for opening a new window called \"w2\" ?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_question` (`QuestionId`);

--
-- Indexes for table `highscore`
--
ALTER TABLE `highscore`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `highscore`
--
ALTER TABLE `highscore`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_question` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
