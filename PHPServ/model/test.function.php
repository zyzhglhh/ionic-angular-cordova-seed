<?php

function get_user_info_by_id( $username, $password )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s AND `Password` = ?s AND `actNum` = ?i", array( $username, $password, 0 ) );
	return get_line( $sql);
}

function unique_verifying( $username, $mobi, $email, $celluuid )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s OR `Mobile` = ?s OR `Email` = ?s OR `celluuid` = ?s", array( $username, $mobi, $email, $celluuid ) );
	return get_data( $sql);
}