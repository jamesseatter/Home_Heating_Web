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
	//echo "connected";
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	// Set a default if no param is provided.
	if (!(isset($type))) {
		$type = "Last30Days";
	}
	
	
	$sql = "SELECT date,temperature from home_heating.vWebAlertsActive";
		
	//echo "SQL Query - $sql<br>";
	
	//Execute the query
	$result = $conn->query($sql);
	
	$rows = array();
	//flag is not needed
	$flag = true;
	$table = array();
	$table['cols'] = array(
	
			// Labels for your chart, these represent the column titles
			// Note that one column is in "string" format and another one is in "number" format as pie chart only required "numbers" for calculating percentage and string will be used for column title
			array('label' => 'Date', 'type' => 'string'),
			array('label' => 'Temperature', 'type' => 'number')	
	);
	
	$rows = array();
	while($r = $result->fetch_assoc())
	{
		$temp = array();
		$temp[] = array('v' => (string) $r['date']);
		$temp[] = array('v' => (int) $r['temperature']);
		$rows[] = array('c' => $temp);
	}
	
	$table['rows'] = $rows;
	$jsonTable = json_encode($table);
	
	echo $jsonTable;
	
	$conn->close();
?>