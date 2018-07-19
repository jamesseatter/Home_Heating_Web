<?php // content="text/plain; charset=utf-8"
// Generates a JSON string in the format [{<object>}], example [{"name":"james","age":42},{"name":"steph","age":39}]

	if($_GET["q"] === "") { $queryDays = 1; } else { $queryDays=$_GET["q"]; }
	
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
	//echo "connected";
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	// Set a default if no param is provided.
	if (!(isset($type))) {
		$type = "Last30Days";
	}
	
	$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL $queryDays DAY)";
		
	//echo "SQL Query - $sql<br>";
	
	//Execute the query
	$result = $conn->query($sql);
	
	//
	$table = array();
		
	while($r = $result->fetch_assoc())
	{
		$row = (object) [
			'Date' => (string) $r['date'],
			'Temperature' => (int) $r['temperature'],
			'Cleared' => (int) $r['cleared'],
			'Cleareddate' => (string) $r['cleareddate']
		];

		$table[] = $row;
	}
	
	$jsonTable = json_encode($table);

	echo $jsonTable;
	
	$conn->close();
?>

