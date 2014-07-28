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


class sendurlController extends appController
{
	function __construct()
	{
		// 载入默认的
		parent::__construct();

	}
	
	public function sendurl()
	{
		//include_once(AROOT . 'lib' .DS. 'phpqrcode' .DS. 'qrlib.php');

		$imgurl = 'img' .DS. 'barcode_temp' .DS. 'qr_barcode.png';
		//QRcode::png('aaaaaasdfasdfasdfsadfaaaadsfasdfaaaaaa', AROOT . $imgurl, 'L', 5, 1);

		
		if( file_exists(AROOT . $imgurl) )
		{
			return $this->send_result( array( 'imgurl' => $imgurl ) );
		}
		else
		{
			return $this->send_error( OP_API_TOKEN_ERROR , "二维码获取失败！" );
		}
		
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