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

function unique_verifying( $username, $celluuid )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s OR `celluuid` = ?s", 
					array( $username, $celluuid ) );
	return get_data( $sql );
}

function insert_user_info( $username, $password, $name, $mobi, $email, $Datetime, $celluuid )
{
	$sql = prepare("INSERT INTO `login` 
					(`UserName`,`Password`,`Name`,`Mobile`,`Email`,`actNum`,`UserLevel`,`SignupDate`,`LoginTimes`,`LastLogin`,`LastLoginFail`,`LoginIP`,`NumLoginFail`,`celluuid`,`latitude`,`longitude`) 
					VALUES 
					(?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s)", 
					array( $username, $password, $name, $mobi, $email, '0', '1', $Datetime, '0', '', '0', '0', '0', $celluuid, '30.263000', '120.117000' ));
	return run_sql( $sql );
	//return $sql;
}

function update_login( $columnid, $values, $username )
{
	$sql = "UPDATE `login` SET $columnid = '$values' WHERE UserName = '$username'";
	return run_sql( $sql );
	//return $sql;
}