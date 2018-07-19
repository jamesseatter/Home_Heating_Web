<?php // content="text/plain; charset=utf-8"
	
	// MySQL database connection info
	$servername = "localhost";
	$username = "webserver";
	$password = "835Eh81Dj5F5";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password);
	
	//if (mysqli_connect_errno()) {
	//	echo "Connect failed\n";
	//	exit();
	//}
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
	$sql = "SELECT * from vWebMonitorActivity";
	
//	echo "SQL Query - $sql<br>";
	
	//Execute the query
	$result = $conn->query($sql);
	$rowcount = $result->num_rows;
	echo $rowcount;
	
	$result->close();
	$conn->close();
?>