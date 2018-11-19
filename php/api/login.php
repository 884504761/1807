<?php
	header("Access-Control-Allow-Origin:*");

	include("../connect.php");
	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql = "select * from t_user where username='$username' and password='$password'";
	$res = mysql_query($sql);
	$row = mysql_num_rows($res);

	if($row > 0){
		echo '{"code":1}';
	}else{
		echo '{"code":0}';
	}
	mysql_close();

?>