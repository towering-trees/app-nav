-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2022 �?08 �?16 �?11:16
-- 服务器版本: 5.5.53
-- PHP 版本: 5.5.38

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `app_nav`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `nickname`, `avatar`, `status`) VALUES
(1, 'admin', '123456', 'admin', NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `app`
--

CREATE TABLE IF NOT EXISTS `app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `pic` varchar(255) DEFAULT NULL COMMENT '图标',
  `class` varchar(10) DEFAULT NULL COMMENT '分类',
  `num` int(11) DEFAULT NULL COMMENT '下载次数',
  `details` varchar(255) DEFAULT NULL COMMENT '详情',
  `url` varchar(255) DEFAULT NULL COMMENT '下载地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `app`
--

INSERT INTO `app` (`id`, `title`, `pic`, `class`, `num`, `details`, `url`) VALUES
(1, '爱奇艺', 'https://i.ibb.co/FmsvJpq/iqiyi.jpg', '推荐应用', 996, '爱奇艺(iQIYI.COM)是拥有海量、优质、高清的网络视频的大型视频网站,专业的网络视频播放平台', 'https://www.baidu.com/'),
(4, '1905电影', 'https://i.ibb.co/d7Jx6bM/m1905.jpg', '推荐应用', 99, '1905电影网(电影频道官方网站)', 'https://www.baidu.com/'),
(5, '芒果TV', 'https://i.ibb.co/ZRjWpZW/mgtv.jpg', '推荐应用', 101, '芒果TV-大家都在看的在线视频网站-热门综艺最新电影电视剧在线观看', 'https://www.baidu.com/'),
(6, 'PPTV', 'https://i.ibb.co/PZDyH45/pptv.jpg', '推荐应用', 998, 'PP视频电影频道提供国内主流正版高清电影在线观看', 'https://www.baidu.com/'),
(20, '优酷视频', 'https://i.ibb.co/LCG7QHv/youku.jpg', '推荐应用', 320, '视频服务平台, 提供视频播放, 视频发布, 视频搜索, 视频分享', 'https://www.baidu.com/'),
(10, '搜狐视频', 'https://i.ibb.co/2N0xm6X/souhu.jpg', '推荐应用', 123, '搜狐视频是搜狐旗下专业的综合视频网站,提供正版高清电影、电视剧、综艺、纪录片、动漫等', 'https://www.baidu.com/'),
(15, '腾讯视频', 'https://i.ibb.co/XxndfZt/tengxun.jpg', '热门应用', 552, '腾讯视频致力于打造中国领先的在线视频媒体平台', 'https://www.baidu.com/'),
(21, '抖音', 'https://i.ibb.co/99q8QBM/a8.gif', '精品应用', 1230, '抖音让每一个人看见并连接更大的世界,鼓励表达、沟通和记录,激发创造,丰富人们的精神世界,让现实生活更美好。', 'https://www.douyin.com/'),
(22, '快手', 'https://i.ibb.co/X3ndqqb/ks.png', '精品应用', 566, '快手是一款国民级短视频App', 'https://www.baidu.com/');

-- --------------------------------------------------------

--
-- 表的结构 `classify`
--

CREATE TABLE IF NOT EXISTS `classify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classify` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `classify`
--

INSERT INTO `classify` (`id`, `classify`) VALUES
(1, '推荐应用'),
(2, '热门应用'),
(3, '精品应用');

-- --------------------------------------------------------

--
-- 表的结构 `lunbo`
--

CREATE TABLE IF NOT EXISTS `lunbo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic` varchar(255) DEFAULT NULL COMMENT '图片',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `lunbo`
--

INSERT INTO `lunbo` (`id`, `pic`, `title`) VALUES
(1, 'https://www.4kbizhi.com/d/file/2021/08/27/small2352227JN8n1630079542.jpg', '轮播标题1'),
(2, 'https://www.4kbizhi.com/d/file/2021/09/08/small113013ILStv1631071813.jpg', '轮播标题2'),
(3, 'https://www.4kbizhi.com/d/file/2021/08/12/small111922UwNmh1628738362.jpg', '轮播标题3');

-- --------------------------------------------------------

--
-- 表的结构 `setting`
--

CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL,
  `notice` varchar(255) DEFAULT NULL COMMENT '网站公告',
  `title` varchar(255) DEFAULT NULL COMMENT '网站标题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `setting`
--

INSERT INTO `setting` (`id`, `notice`, `title`) VALUES
(1, '这里是公告,点击右侧 x 按钮可关闭哦', '应用导航网站');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nickname`, `avatar`, `status`) VALUES
(1, 'test', '123456', '小白', NULL, 1),
(2, 'test2', '123456', '大白', NULL, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
