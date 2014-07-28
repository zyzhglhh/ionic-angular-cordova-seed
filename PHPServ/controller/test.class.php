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


class testController extends appController
{
	function __construct()
	{
		// 载入默认的
		parent::__construct();

	}
	
	public function test()
	{
		$username = 'alexgzhou';
		$mobi = '123';
		$email = 'a@163.com';
		$celluuid = 'a';

		$row = unique_verifying( $username, $mobi, $email, $celluuid );

		//header("Content-type: text/html; charset=utf-8"); 

		utf8_encode(var_dump($row));
		$arrlength=count($row);
		echo '<br>+++++++++++++'.$arrlength;
		echo '<br>+++++++++++++'.$row[0]['UserName'];

		while(0) {
			if ($row["UserName"]==$username) {
				//$error=true;
				echo "用户名已存在<br>";
				//return $this->send_error( OP_API_TOKEN_ERROR , "用户名已存在<br>" );
			}
			if ($row["Email"]==$email) {
				//$error=true;
				echo "用户邮箱已经注册<br>";
				//return $this->send_error( OP_API_TOKEN_ERROR , "用户邮箱已经注册<br>" );
			}
		}



		
	}
	
}



?>