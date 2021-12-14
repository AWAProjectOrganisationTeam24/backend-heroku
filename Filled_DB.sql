-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 12. pro 2021, 22:26
-- Verze serveru: 10.4.18-MariaDB
-- Verze PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `awa_project`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `id_manager` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `mail` text NOT NULL,
  `psw` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `money` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `customer`
--

INSERT INTO `customer` (`id_customer`, `id_manager`, `firstname`, `lastname`, `mail`, `psw`, `address`, `city`, `money`) VALUES
(1, 1, 'Alex', 'Niektro', 'alex@mail.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Nunfekujia 4', 'Oulu', 10000),
(2, 2, 'Alice', 'Wreckor', 'alice@mail.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Kuserritika 79', 'Oulu', 290),
(3, 3, 'Ferb', 'Finias', 'ferb@mail.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Anakondova 12', 'Rovaniemi', 590),
(8, 8, 'Mark', 'Borek', 'mark@mail.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Markova 13', 'Helsinki', 487),
(9, 9, 'Jakub', 'Diesel', 'jakub@mail.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Jakubova 13', 'Helsinki', 874),
(10, 10, 'JuLJBB', 'OUAtz', 'j6@seznam.cz', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'LBUIZIZV 2', 'Rovaniemi', 287),
(11, 11, 'Lucie', 'Lakamaca', 'l@kiki.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'uzfzrd 2', 'Rovaniemi', 1890),
(12, 12, 'Julie', 'Pražákova', 'l2@kiki.fi', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'Pod Zámkem', 'Valtice', 856),
(14, 14, 'Alex', 'Alex', 'indciw', '$2b$06$V5HK4/4fQQnR/saNk7dH/uPvDJOFJtbKgiFTP0VJkMFkoqFR3kdC2', 'asc', 'afv', 1029);

-- --------------------------------------------------------

--
-- Struktura tabulky `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `price` float NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `status` text NOT NULL,
  `content` text NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `deliveryAddress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `orders`
--

INSERT INTO `orders` (`id_order`, `id_restaurant`, `id_customer`, `price`, `time`, `date`, `status`, `content`, `paid`, `deliveryAddress`) VALUES
(1, 1, 1, 2000, '13:56:01', '2021-11-16', 'Preparing', 'Burger, fries, ketchup', 1, ''),
(2, 3, 3, 130, '10:34:27', '2021-11-16', 'Delivered', 'Sushi set Maki', 1, ''),
(3, 3, 8, 350, '10:06:38', '2021-11-17', 'Delivered', 'Sushi box', 1, ''),
(4, 2, 9, 790, '17:45:17', '2021-11-15', 'Delivered', 'Kebab roll', 1, ''),
(5, 2, 11, 395, '00:17:54', '2021-12-05', 'Received', 'Kebab roll', 1, ''),
(6, 2, 11, 395, '00:22:22', '2021-12-03', 'ordered', 'Kebab roll', 1, ''),
(12, 2, 11, 395, '01:00:20', '2021-12-04', 'ordered', 'Kebab roll', 1, ''),
(13, 3, 11, 260, '21:07:16', '0000-00-00', 'ordered', 'Sushi set Maki', 1, ''),
(14, 2, 11, 395, '21:17:38', '0000-00-00', 'ordered', 'Kebab roll', 1, ''),
(15, 2, 11, 395, '21:17:58', '0000-00-00', 'ordered', 'Kebab roll', 1, ''),
(16, 2, 11, 395, '21:18:25', '0000-00-00', 'ordered', 'Kebab roll', 1, ''),
(17, 2, 11, 395, '21:21:22', '0000-00-00', 'ordered', 'Kebab roll', 1, '');

-- --------------------------------------------------------

--
-- Struktura tabulky `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `category` text NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `products`
--

INSERT INTO `products` (`id_product`, `id_restaurant`, `category`, `name`, `description`, `price`, `image`) VALUES
(1, 3, 'sushi', 'Sushi set Maki', '4 maki, 4 california salmon', 130, 'sushi1.jpg'),
(2, 3, 'sushi', 'Sushi box', '16 maki, 16 california salmon', 350, 'sushi2.jpg'),
(3, 2, 'kebab', 'Kebab roll', 'meat, roll, vegetables', 395, 'kebab1.jpg'),
(4, 1, 'burger', 'Burger', 'pork meat, tomato, fries, ketchup', 2000, 'burger.jpg'),
(5, 4, 'sushi', 'Malibu', '4 sets', 1792, 'sushi3.jpg'),
(6, 4, 'sweets', 'ice cream', 'sweet', 120, 'http://127.0.0.1:5000/images/file-1639051725848.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `restaurant`
--

CREATE TABLE `restaurant` (
  `id_restaurant` int(11) NOT NULL,
  `id_manager` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `image` text NOT NULL,
  `type` text NOT NULL,
  `openHr` text NOT NULL,
  `priceLevel` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Vypisuji data pro tabulku `restaurant`
--

INSERT INTO `restaurant` (`id_restaurant`, `id_manager`, `name`, `address`, `city`, `image`, `type`, `openHr`, `priceLevel`) VALUES
(1, 1, 'The lobster', 'Tutkijantioe 2', 'Oulu', 'restaurant1.jpg', 'fast food', '10:00-22:00', '$$'),
(2, 2, 'Foodoo ', 'Alerinka31', 'Rovaniemi', 'restaurant2.jpg', 'fast food', '12:00-20:00', '$'),
(3, 3, 'Sushi bar', 'Lakontakita 3', 'Helsinki', 'restaurant3.jpg', 'fast food', '11:00-16:00', '$$$'),
(4, 11, 'Kapitan', 'Podkurantie 4', 'Oulu', 'restaurant4.jpg', 'Fast casual', '09:00-20:00', '$$'),
(5, 11, 'Albero', 'Tutukarina 3', 'Oulu', 'restaurant5.jpg', 'Fast casual', '14:00-23:00', '$$$$');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexy pro tabulku `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indexy pro tabulku `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Indexy pro tabulku `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id_restaurant`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pro tabulku `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pro tabulku `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
