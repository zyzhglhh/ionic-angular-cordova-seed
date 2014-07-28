<?php
if( !defined('IN') ) die('bad request');
include_once( AROOT . 'controller'.DS.'app.class.php' );


define( 'OP_API_TOKEN_ERROR' , 10001 );
define( 'OP_API_USER_ERROR' , 10002 );
define( 'OP_API_LEVEL_ERROR' , 10003 );
define( 'OP_API_DB_ERROR' , 10004 );
define( 'OP_API_NOT_IMPLEMENT_YET' , 10005 );
define( 'OP_API_ARGS_ERROR' , 10006 );
define( 'OP_API_DB_EMPTY_RESULT' , 10007 );
define( 'OP_API_UPLOAD_ERROR' , 10008 );
define( 'OP_API_STORAGE_ERROR' , 10009 );


class checkinController extends appController
{
	function __construct()
	{
		// 载入默认的
		parent::__construct();

	}
	
	public function checkin()
	{
		//$token = z(t(v('token')));
		$barcodevalue = t(v('barcodevalue'));
		$barcodeformat = z(t(v('barcodeformat')));
		$username = z(t(v('username')));
		$celluuid = z(t(v('celluuid')));
		$latitude = z(t(v('latitude')));
		$longitude = z(t(v('longitude')));

		/*$barcodevalue = "abcdefg";
		$barcodeformat = "hijklmn";
		$username = "alexgzhou";*/
		//$remember = v('remember');
		
		//$sql = "SELECT * FROM `user` WHERE `email` = '" . s( $email ) . "' AND `password` = '" . md5( $password ) . "' AND `status` = 'OK' LIMIT 1";
		
		$datetime=date("Y-m-d G");
		$thismoment=date("Y-m-d H:i:s");

		$name = get_user_info_by_id( $username );
		$user = insert_checkin_info( $barcodevalue, $barcodeformat, $datetime, $username, $thismoment, $celluuid, $latitude, $longitude );
		
		if( $user && $name )
		{
			return $this->send_result( array( 'datetime' => $thismoment, 'username' => $username, 'name' => $name['Name'] ) );
		}
		else
		{
			return $this->send_error( OP_API_TOKEN_ERROR , db_error().", 签到失败！" );
		}
		
	}

	public function checklocation()
	{
		//$token = z(t(v('token')));
		$latitude = t(v('latitude'));
		$longitude = z(t(v('longitude')));
		$username = z(t(v('username')));

		/*$barcodevalue = "abcdefg";
		$barcodeformat = "hijklmn";
		$username = "alexgzhou";*/
		//$remember = v('remember');
		
		//$sql = "SELECT * FROM `user` WHERE `email` = '" . s( $email ) . "' AND `password` = '" . md5( $password ) . "' AND `status` = 'OK' LIMIT 1";

		$user = get_user_info_by_id( $username );
		
		if( $user )
		{
			if ( floatval($latitude) - floatval($user['latitude']) < 0.001 && floatval($latitude) - floatval($user['latitude']) > -0.001 && floatval($longitude) - floatval($user['longitude']) < 0.002 && floatval($longitude) - floatval($user['longitude']) > -0.002 ) {
				return $this->send_result( array( 'arrived' => 'confirmed' ) );
			}
			else {
				return $this->send_result( array( 'arrived' => 'negative' ) );
			}
			
		}
		else
		{
			return $this->send_error( OP_API_TOKEN_ERROR , "地址获取失败！" );
		}
		
	}


	public function genbarcode()
	{
		//$token = z(t(v('token')));
		$latitude = t(v('latitude'));
		$longitude = z(t(v('longitude')));
		$username = z(t(v('username')));
		$celluuid = z(t(v('celluuid')));
		$timestamp = z(t(v('timestamp')));

		include_once(AROOT . 'lib' .DS. 'phpqrcode' .DS. 'qrlib.php');

		//$imgurl = 'img' .DS. 'barcode_temp' .DS. $username . '_' . $celluuid . '.png';
		$imgurl = 'img' .DS. 'barcode_temp' .DS. 'qr_barcode.png';
		$barcodeText = md5($username . $celluuid . $latitude . $longitude . $timestamp);
		QRcode::png($barcodeText, AROOT . $imgurl, 'L', 5, 1);

		
		if( file_exists(AROOT . $imgurl) )
		{
			return $this->send_result( array() );
		}
		else
		{
			return $this->send_error( OP_API_TOKEN_ERROR , "二维码生成失败！" );
		}
	}

	
	private function check_token()
	{
		$token = z(t(v('token')));
		if( strlen( $token ) < 2 ) return $this->send_error( OP_API_TOKEN_ERROR , 'no token' );
		
		session_id( $token );
		session_start();
		
		if( $_SESSION['token'] != $token ) return $this->send_error( OP_API_TOKEN_ERROR , 'bad token' );
	}
	
	public function send_error( $number , $msg )
	{	
		$obj = array();
		$obj['err_code'] = intval( $number );
		$obj['err_msg'] = $msg;
		
		//die( z(t(v('callback'))).'('.json_encode( $obj ).')' );
		die( json_encode( $obj ) );
	}
	
	public function send_result( $data )
	{
		$obj = array();
		$obj['err_code'] = '0';
		$obj['err_msg'] = 'success';
		$obj['data'] = $data;
		
		//die( z(t(v('callback'))).'('.json_encode( $obj ).')' );
		die( json_encode( $obj ) );
	}
	
}