
CREATE DATABASE `doc_track_sys`;

USE `doc_track_sys`;

CREATE TABLE `doc` (
  `id` int(10) NOT NULL,
  `stud_rec_id` int(10) NOT NULL,
  `form137` int(1) NOT NULL DEFAULT 0,
  `form138` int(1) NOT NULL DEFAULT 0,
  `bcert` int(1) NOT NULL DEFAULT 0,
  `tor_hd` int(1) NOT NULL DEFAULT 0,
  `clearance_f` int(1) NOT NULL DEFAULT 0,
  `app_grad` int(1) NOT NULL DEFAULT 0,
  `cred` int(1) NOT NULL DEFAULT 0,
  `regi` int(1) NOT NULL DEFAULT 0,
  `c_honorable` int(1) NOT NULL DEFAULT 0,
  `c_trans` int(1) NOT NULL DEFAULT 0,
  `complete` int(1) NOT NULL DEFAULT 0,
  `gm` int(1) NOT NULL DEFAULT 0,
  `shelf` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `bday` date DEFAULT NULL,
  `gender` enum('M','F','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stud_rec`
--

CREATE TABLE `stud_rec` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `x_file_id` int(10) DEFAULT NULL,
  `stud_fname` varchar(50) NOT NULL,
  `stud_mname` varchar(50) DEFAULT NULL,
  `stud_lname` varchar(50) DEFAULT NULL,
  `stud_sfx` varchar(20) DEFAULT NULL,
  `stud_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `pword` varchar(255) NOT NULL,
  `active` int(1) NOT NULL DEFAULT 1,
  `role` enum('admin','viewer','encoder') NOT NULL DEFAULT 'viewer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uname`, `pword`, `active`, `role`) VALUES
(1, 'admin', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 'admin'),
(2, 'encoder', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 'encoder'),
(3, 'viewer1', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 'viewer'),
(4, 'viewer2', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 0, 'viewer');

-- --------------------------------------------------------

--
-- Table structure for table `x_file`
--

CREATE TABLE `x_file` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dt` date DEFAULT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doc`
--
ALTER TABLE `doc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stud_rec_id` (`stud_rec_id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `stud_rec`
--
ALTER TABLE `stud_rec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `x_file_id` (`x_file_id`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `x_file`
--
ALTER TABLE `x_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doc`
--
ALTER TABLE `doc`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stud_rec`
--
ALTER TABLE `stud_rec`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `x_file`
--
ALTER TABLE `x_file`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doc`
--
ALTER TABLE `doc`
  ADD CONSTRAINT `doc_ibfk_1` FOREIGN KEY (`stud_rec_id`) REFERENCES `stud_rec` (`id`);

--
-- Constraints for table `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `stud_rec`
--
ALTER TABLE `stud_rec`
  ADD CONSTRAINT `stud_rec_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `stud_rec_ibfk_2` FOREIGN KEY (`x_file_id`) REFERENCES `x_file` (`id`);

--
-- Constraints for table `x_file`
--
ALTER TABLE `x_file`
  ADD CONSTRAINT `x_file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
