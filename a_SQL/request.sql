-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Mar 02, 2024 at 06:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dds_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `mname` varchar(45) NOT NULL,
  `file` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reason` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` int(11) NOT NULL,
  `priority` tinyint(1) NOT NULL DEFAULT 0,
  `status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `deleted_flag` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `lname`, `fname`, `mname`, `file`, `reason`, `created_at`, `created_by`, `updated_at`, `updated_by`, `priority`, `status`, `due_date`, `deleted_flag`) VALUES
(1, 'penaranda', 'patrickyyy', 'jabonillo\'\'', 'TOR, Cert of Grad', 'eme lang po', '2024-02-27 14:29:20', 20, '0000-00-00 00:00:00', 0, 0, '', NULL, 1),
(2, 'penaranda', 'patrick', 'jabonillo\'\'', 'TOR, Cert of Grad', 'eme lang', '2024-02-27 14:45:57', 20, '0000-00-00 00:00:00', 0, 0, '', NULL, 1),
(3, 'penaranda', 'patrickyyy', 'jabonillo\'\'', 'TOR, Cert of Grad', 'eme lang po', '2024-02-27 16:55:07', 0, '0000-00-00 00:00:00', 0, 0, '', NULL, 0),
(4, 'Penaranda', 'Patrick', 'Jabonillo', 'form 137', 'Jabonillo', '2024-02-28 08:26:00', 20, '2024-02-28 08:54:33', 0, 0, '', NULL, 0),
(5, 'fsdhf', 'hfhsdui', 'uhufhsd', 'huhui', 'fgsfu', '2024-03-03 01:03:55', 14, '0000-00-00 00:00:00', 0, 1, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;