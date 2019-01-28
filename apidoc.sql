/*
 Navicat MySQL Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : apidoc

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 25/01/2019 17:05:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apidoc_api
-- ----------------------------
DROP TABLE IF EXISTS `apidoc_api`;
CREATE TABLE `apidoc_api` (
  `api_id` varchar(64) NOT NULL COMMENT 'api 的id',
  `sort_id` varchar(64) DEFAULT '0' COMMENT '分类id',
  `project_id` varchar(64) DEFAULT '0' COMMENT '项目id',
  `api_name` varchar(255) DEFAULT NULL COMMENT 'api的名称',
  `api_edit_content` text COMMENT 'api的编辑内容',
  `api_show_content` text COMMENT 'api的展示内容',
  `api_state` int(1) DEFAULT '1' COMMENT '状态（1正常，2冻结，3删除）',
  `created_at` varchar(64) DEFAULT '0' COMMENT '创建时间',
  `updated_at` varchar(64) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`api_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='api表';

-- ----------------------------
-- Table structure for apidoc_project
-- ----------------------------
DROP TABLE IF EXISTS `apidoc_project`;
CREATE TABLE `apidoc_project` (
  `project_id` varchar(64) NOT NULL COMMENT '项目id',
  `project_name` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `project_state` int(1) DEFAULT '1' COMMENT '状态（1正常，2冻结，3删除）',
  `created_at` varchar(65) DEFAULT '0' COMMENT '创建时间',
  `updated_at` varchar(65) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='项目表';

-- ----------------------------
-- Table structure for apidoc_sort
-- ----------------------------
DROP TABLE IF EXISTS `apidoc_sort`;
CREATE TABLE `apidoc_sort` (
  `sort_id` varchar(64) NOT NULL COMMENT '分类id',
  `sort_top_id` varchar(64) DEFAULT '0' COMMENT '分类最上级id （默认0）',
  `sort_pid` varchar(64) DEFAULT '0' COMMENT '分类上级id （默认0）',
  `project_id` varchar(64) DEFAULT '0' COMMENT '项目id',
  `sort_name` varchar(255) DEFAULT '无' COMMENT '分类名称',
  `sort_seq` int(11) DEFAULT '1000' COMMENT '分类排序',
  `status` int(1) DEFAULT '1' COMMENT '状态（1正常，2冻结，3删除）',
  `created_at` varchar(64) DEFAULT '0' COMMENT '创建时间',
  `updated_at` varchar(64) DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分类表';

-- ----------------------------
-- Table structure for apidoc_user
-- ----------------------------
DROP TABLE IF EXISTS `apidoc_user`;
CREATE TABLE `apidoc_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `user_password` varchar(255) DEFAULT NULL COMMENT '密码',
  `created_at` varchar(20) DEFAULT '0' COMMENT '创建时间',
  `updated_at` varchar(20) DEFAULT '0' COMMENT '修改时间',
  `user_state` int(1) DEFAULT '1' COMMENT '状态（1正常，2冻结，3删除）',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户id加密',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';

-- ----------------------------
-- Table structure for apidoc_user_project
-- ----------------------------
DROP TABLE IF EXISTS `apidoc_user_project`;
CREATE TABLE `apidoc_user_project` (
  `user_id` varchar(64) DEFAULT '0' COMMENT '用户id',
  `project_id` varchar(64) DEFAULT '0' COMMENT '项目id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户项目表';

SET FOREIGN_KEY_CHECKS = 1;
