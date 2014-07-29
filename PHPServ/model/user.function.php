<?php

function get_user_info_by_id( $username )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s", 
					array( $username ) );
	return get_line( $sql );
}

/*function unique_verifying( $username, $mobi, $email, $celluuid )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s OR `Mobile` = ?s OR `Email` = ?s OR `celluuid` = ?s", 
					array( $username, $mobi, $email, $celluuid ) );
	return get_data( $sql );
}*/

function unique_verifying( $username, $mobi )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s OR `Mobile` = ?s", 
					array( $username, $mobi ) );
	return get_data( $sql );
}

function insert_user_info( $username, $password, $name, $mobi, $gender )
{
	$sql = prepare("INSERT INTO `login` 
					(`UserName`,`Password`,`Name`,`Mobile`,`Gender`) 
					VALUES 
					(?s, ?s, ?s, ?s, ?s)", 
					array( $username, $password, $name, $mobi, $gender ));
	return run_sql( $sql );
	//return $sql;
}

function update_login( $columnid, $values, $username )
{
	$sql = "UPDATE `login` SET $columnid = '$values' WHERE UserName = '$username'";
	return run_sql( $sql );
	//return $sql;
}