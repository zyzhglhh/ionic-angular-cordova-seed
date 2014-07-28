<?php

function insert_checkin_info( $barcodevalue, $barcodeformat, $datetime, $username, $thismoment, $celluuid, $latitude, $longitude )
{
	$sql = prepare("INSERT INTO `checkinlog` (barcodevalue, barcodeformat, datetime, username, thismoment, celluuid, latitude, longitude) VALUES (?s, ?s, ?s, ?s, ?s, ?s, ?s, ?s)", array( $barcodevalue, $barcodeformat, $datetime, $username, $thismoment, $celluuid, $latitude, $longitude ));
	//$sql = "INSERT INTO checkinlog (barcodevalue, barcodeformat, datetime, username) VALUES ('{$barcodevalue}', '{$barcodeformat}', '{$datetime}', '{$username}')";
	return run_sql( $sql );
}

function get_user_info_by_id( $username )
{
	$sql = prepare("SELECT * FROM `login` WHERE `UserName` = ?s", array( $username ) );
	return get_line( $sql);
}