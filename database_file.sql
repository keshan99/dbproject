-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2022 at 11:20 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student-helper`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `A_ID` int(11) NOT NULL,
  `is_held` enum('Yes','No') NOT NULL,
  `is_participat` enum('Yes','No') NOT NULL,
  `topic` varchar(100) NOT NULL,
  `note` varchar(1000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `User_id` int(11) NOT NULL,
  `T_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `Note_ID` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `note` varchar(1000) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`Note_ID`, `img`, `date_time`, `title`, `note`, `User_id`) VALUES
(1, '', '2021-09-23 07:05:36', 't1', 'note1', 8),
(3, '', '2021-09-23 07:06:27', 't3', 'note 3', 8),
(4, '', '2021-09-23 20:04:04', 't4', 'hi, \r\nthis is note 5\r\naaaad', 8),
(6, '', '2021-09-23 23:46:47', ' last test ', 'upnote bjjbssa', 8),
(9, '', '2021-09-24 10:23:58', 'note10', 'note 10 bla bla bla', 8),
(10, '', '2021-10-27 23:02:20', 'note bla bla', '1234567890', 8),
(12, '', '2022-01-09 17:57:14', 'color code', '#72efe9', 8);

-- --------------------------------------------------------

--
-- Table structure for table `priority_list`
--

CREATE TABLE `priority_list` (
  `P_ID` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `priority_list`
--

INSERT INTO `priority_list` (`P_ID`, `User_id`, `topic`, `priority`) VALUES
(1, 8, 'T1 ', 0),
(2, 8, 'Topic 2', 1),
(5, 7, 'arya topic 1', 0),
(9, 7, 'topic test 2', 0),
(17, 8, 'Topic test with my sql 1', 0),
(25, 8, 'Exam', 0),
(26, 8, 'next.js tutorial', 0),
(27, 8, 'react', 0),
(28, 8, 'BTH game', 0);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE `record` (
  `RID` int(11) NOT NULL,
  `value` double NOT NULL,
  `note` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `bil_img` varchar(255) NOT NULL,
  `TID` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`RID`, `value`, `note`, `date_time`, `bil_img`, `TID`, `User_id`) VALUES
(11, 20, '', '2021-08-26 06:40:19', '', 11, 8),
(12, 20, '', '2021-08-28 06:40:33', '', 1, 8),
(13, 20, '', '2021-08-28 06:40:50', '', 2, 8),
(14, 0, '', '2021-08-18 06:41:04', '', 3, 8),
(15, 30, '', '2021-08-18 06:41:34', '', 3, 8),
(16, 20, 'hello', '2021-08-18 08:57:46', 'no', 11, 8),
(19, 20, 'kof', '2021-08-28 09:14:53', 'kof', 10, 8),
(21, 100, ' ඉල්ල ගත්තෙ', '2021-08-28 09:16:03', '', 15, 8),
(22, 100, 'test100', '2021-08-28 12:48:31', 'no', 15, 8),
(24, 22, '', '2021-08-18 19:45:35', 'no', 14, 8),
(25, 22, 'hi', '2021-08-30 19:47:07', 'no', 16, 7),
(26, 22, '', '2021-08-28 20:07:53', 'no', 15, 8),
(30, 22, '', '2021-08-28 20:14:17', 'no', 14, 8),
(31, 50, '', '2021-08-18 20:16:22', 'no', 11, 8),
(32, 220, '', '2021-08-18 20:17:46', 'no', 2, 8),
(33, 1111, '1111111', '2021-08-18 20:18:05', 'no', 1, 8),
(34, 0, '', '2021-08-18 20:18:24', 'no', 2, 8),
(35, 44, '444', '2021-09-08 20:18:32', 'no', 1, 8),
(36, 220, 'edit', '2021-08-18 20:19:27', 'no', 1, 8),
(40, 20, 'gxfg', '2021-08-25 12:07:40', 'no', 3, 7),
(41, 22, 'hi', '2021-08-25 12:07:47', 'no', 16, 7),
(45, 0, 'gdg', '2021-09-23 22:25:43', '', 16, 7),
(46, 14, 'kok', '2021-09-23 22:27:11', '', 16, 7),
(47, 14, 'tertert', '2021-09-24 10:21:18', 'no', 10, 8),
(49, 24, '', '2021-10-21 10:46:57', 'no', 10, 8),
(50, 25, '', '2021-10-27 23:01:38', 'no', 17, 8),
(51, 35, 'dgdgdg', '2021-11-07 20:10:35', 'no', 10, 8),
(52, 14, 'web d', '2022-01-09 09:00:57', 'no', 10, 8),
(53, 500, 'Hacking NASA', '2022-01-09 09:01:52', 'no', 36, 8),
(54, 1, '', '2022-01-09 09:09:47', 'no', 17, 8),
(56, 100, '', '2022-01-09 12:51:34', 'no', 37, 8),
(57, 20, 'cod4', '2022-01-09 16:29:27', 'no', 11, 8),
(58, 100, 'hacking', '2022-01-12 19:47:52', 'no', 36, 8),
(59, 65, 'lost', '2022-01-27 01:19:02', 'no', 4, 8),
(60, 100, 'photoshop', '2022-01-27 01:20:20', 'no', 15, 8);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `Sub_ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `semester` int(11) NOT NULL,
  `departmant` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pList_id` int(11) NOT NULL,
  `done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `name`, `pList_id`, `done`) VALUES
(1, ' task 1 for T1', 1, 0),
(2, ' task 2 for T1', 1, 1),
(3, ' task 3 for T1', 1, 1),
(4, ' task 1 for t2', 2, 0),
(5, ' task 2 for t2', 2, 1),
(6, ' task 3 for t2', 2, 0),
(7, 'TASK TEST 01', 9, 0),
(8, 'asasa', 9, 0),
(9, ' task1 for ttwms 1', 17, 0),
(10, ' task2 for ttwms 1', 17, 1),
(11, ' task3 for ttwms 1', 17, 0),
(28, ' task4 for ttwms 1', 17, 1),
(37, ' db', 25, 1),
(38, ' dsp', 25, 0),
(39, ' coa', 25, 0),
(40, ' sc', 25, 0),
(41, ' intro', 26, 1),
(42, ' intro', 27, 1),
(43, ' L 01', 28, 1),
(44, ' react', 26, 1),
(45, ' pre-rendaring', 26, 1),
(46, ' useState', 27, 0),
(47, ' UseEfect', 27, 0),
(48, ' update players', 28, 1),
(49, ' L 02', 28, 1),
(50, ' useContext', 27, 0),
(51, ' useRouter', 27, 0),
(52, ' API', 26, 0);

-- --------------------------------------------------------

--
-- Table structure for table `time_table`
--

CREATE TABLE `time_table` (
  `TT_ID` int(11) NOT NULL,
  `days` int(11) NOT NULL,
  `S_time` time NOT NULL,
  `E_time` time NOT NULL,
  `Sub_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `topic_of_money`
--

CREATE TABLE `topic_of_money` (
  `Topic_ID` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `in_or_out` tinyint(1) NOT NULL,
  `User_id` int(11) NOT NULL,
  `priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic_of_money`
--

INSERT INTO `topic_of_money` (`Topic_ID`, `name`, `in_or_out`, `User_id`, `priority`) VALUES
(1, 'breakfirst', 0, 1, 0),
(2, 'lunch', 0, 1, 0),
(3, 'diner', 0, 1, 0),
(4, 'other', 0, 1, 0),
(5, 'other', 1, 1, 0),
(10, 'fiverr', 1, 8, 5),
(11, 'GAME', 0, 8, 4),
(14, 'parent', 1, 8, 2),
(15, 'freelancer', 1, 8, 3),
(16, 'parent', 1, 7, 2),
(17, 'Tea', 0, 8, 2),
(18, 'delete one', 1, 8, 1),
(32, 'job', 1, 7, 3),
(33, 'job_2', 1, 7, 4),
(34, 'book', 0, 7, 2),
(35, ' test', 1, 8, 1),
(36, ' black market', 1, 8, 4),
(37, 'Club', 0, 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `F_name` varchar(30) NOT NULL,
  `M_name` varchar(30) DEFAULT NULL,
  `L_name` varchar(30) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `DOB` date NOT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `batch` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `F_name`, `M_name`, `L_name`, `Email`, `password`, `DOB`, `gender`, `department`, `city`, `batch`) VALUES
(1, 'common', NULL, 'common', '', NULL, '0000-00-00', NULL, NULL, NULL, NULL),
(7, 'Arya', '', 'Stark', 'arya@got.com', '$2a$08$EXQ8PVZfUN7uK5rUKJBUCuNRh/NmN.ijv/LEuKx6loCZx7yxYNfdm', '2001-01-25', 'F', 'civil', 'Winterfell', 'E20'),
(8, 'Edward', 'Tony', 'Stark', 'ironman@mavel.com', '$2a$08$DkIMB9Oq8Ec/3PMZ.WFvX.t3/IT.dF9bkPT6MZPYa8Kcuzz2F3lEi', '1993-06-09', 'M', 'mech', 'USA', 'E17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`A_ID`),
  ADD KEY `User_id` (`User_id`),
  ADD KEY `T_ID` (`T_ID`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`Note_ID`),
  ADD KEY `User_id` (`User_id`);

--
-- Indexes for table `priority_list`
--
ALTER TABLE `priority_list`
  ADD PRIMARY KEY (`P_ID`),
  ADD KEY `user_id_for_priority_list` (`User_id`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`RID`),
  ADD KEY `User_id` (`User_id`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`Sub_ID`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `PL_id_for_task` (`pList_id`);

--
-- Indexes for table `time_table`
--
ALTER TABLE `time_table`
  ADD PRIMARY KEY (`TT_ID`),
  ADD KEY `Sub_ID` (`Sub_ID`);

--
-- Indexes for table `topic_of_money`
--
ALTER TABLE `topic_of_money`
  ADD PRIMARY KEY (`Topic_ID`),
  ADD KEY `User_id` (`User_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `A_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `Note_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `priority_list`
--
ALTER TABLE `priority_list`
  MODIFY `P_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `record`
--
ALTER TABLE `record`
  MODIFY `RID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `Sub_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `time_table`
--
ALTER TABLE `time_table`
  MODIFY `TT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topic_of_money`
--
ALTER TABLE `topic_of_money`
  MODIFY `Topic_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`T_ID`) REFERENCES `time_table` (`TT_ID`);

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`);

--
-- Constraints for table `priority_list`
--
ALTER TABLE `priority_list`
  ADD CONSTRAINT `priority_list_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_id_for_priority_list` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`);

--
-- Constraints for table `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `topic_of_money` (`Topic_ID`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `PL_id_for_task` FOREIGN KEY (`pList_id`) REFERENCES `priority_list` (`P_ID`);

--
-- Constraints for table `time_table`
--
ALTER TABLE `time_table`
  ADD CONSTRAINT `time_table_ibfk_1` FOREIGN KEY (`Sub_ID`) REFERENCES `subject` (`Sub_ID`);

--
-- Constraints for table `topic_of_money`
--
ALTER TABLE `topic_of_money`
  ADD CONSTRAINT `topic_of_money_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
