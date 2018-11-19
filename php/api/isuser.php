<?php
    header("Access-Control-Allow-Origin:*");

    include("../connect.php");
    
    $username = $_POST['username'];

    $sql1 = "select * from t_user where username='$username'";
	$res = mysql_query($sql1);
    $row = mysql_num_rows($res);
    
    if($row > 0){
		echo '{"code":0}';
	}else{
		echo '{"code":1}';
	}
?>