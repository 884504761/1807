<?php
	header("Access-Control-Allow-Origin:*");

	include("../connect.php");


	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql1 = "select * from t_user where username='$username'";
	$res = mysql_query($sql1);
	$row = mysql_num_rows($res);

	if($row > 0){
		echo '{"code":0}';
	}else{
		$sql = "insert into t_user (username, password) values ('$username','$password')";

		$isSuc = mysql_query($sql);

		if($isSuc){
			echo '{"code":1}';
		}else{
			echo '{"code":0}';
		}
	}

 	
	mysql_close();

?>