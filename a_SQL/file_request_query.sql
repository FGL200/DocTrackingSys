-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Mar 08, 2024 at 04:14 AM
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
-- Table structure for table `file_request_categories`
--

CREATE TABLE `file_request_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` int(11) NOT NULL,
  `deleted_flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file_request_categories`
--

INSERT INTO `file_request_categories` (`id`, `name`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_flag`) VALUES
(1, 'PAtrick', '0000-00-00 00:00:00', 1, '2024-03-08 10:37:31', 1, 0),
(2, 'PAtrick', '0000-00-00 00:00:00', 1, '0000-00-00 00:00:00', 0, 0),
(3, 'PAtrick', '2024-03-08 10:30:16', 1, '0000-00-00 00:00:00', 0, 0),
(4, 'PAtrick', '2024-03-08 10:40:20', 1, '2024-03-08 10:50:04', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file_request_categories`
--
ALTER TABLE `file_request_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file_request_categories`
--
ALTER TABLE `file_request_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
