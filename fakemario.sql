-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 06 okt 2022 om 22:46
-- Serverversie: 10.4.20-MariaDB
-- PHP-versie: 8.0.9

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
-- Tabelstructuur voor tabel `highscore`
--

CREATE TABLE `highscore` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Score` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `questions`
--

CREATE TABLE `questions` (
  `Id` int(11) NOT NULL,
  `Question` varchar(255) NOT NULL,
  `AwnserA` varchar(255) NOT NULL,
  `AwnserB` varchar(255) NOT NULL,
  `AwnserC` varchar(255) NOT NULL,
  `AwnserD` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `questions`
--

INSERT INTO `questions` (`Id`, `Question`, `AwnserA`, `AwnserB`, `AwnserC`, `AwnserD`) VALUES
(1, 'Wat is een variable', 'waarde dat steeds veranderd', 'waarde dat steeds het zelfde blijft', 'weet ik veel kan je het eten?', 'een functie'),
(2, 'test', 'test', 'test', 'test', 'test');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `highscore`
--
ALTER TABLE `highscore`
  ADD PRIMARY KEY (`Id`);

--
-- Indexen voor tabel `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `highscore`
--
ALTER TABLE `highscore`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `questions`
--
ALTER TABLE `questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
