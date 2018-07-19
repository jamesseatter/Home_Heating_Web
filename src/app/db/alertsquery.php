<?php // content="text/plain; charset=utf-8"
	
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
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	// Set a default if no param is provided.
	if (!(isset($type))) {
		$type = "Last30Days";
	}
	
	
	switch ($type) {
		case "last1Days":
			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL 1 DAY)";
			break;
		case "Last7Days":
 			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL 7 DAY)";
			break;
		case "Last30Days":
 			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL 30 DAY)";
			break;
		case "Last365Days":
 			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL 365 DAY)";
			break;
		case "Active":
 			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlertsActive";
			break;
		default:
 			$sql = "SELECT date,temperature,cleared,cleareddate from home_heating.vWebAlerts Where DATE(date) >= DATE(NOW() - INTERVAL 7 DAY)";
			break;
	}
	
//	echo "SQL Query - $sql<br>";
	
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
			array('label' => 'Temperature', 'type' => 'number'),
			array('label' => 'Cleared', 'type' => 'number'),
			array('label' => 'ClearedDate', 'type' => 'string')
	
	);
	
	$rows = array();
	while($r = $result->fetch_assoc())
	{
		$temp = array();
		$temp[] = array('v' => (string) $r['date']);
		$temp[] = array('v' => (int) $r['temperature']);
		$temp[] = array('v' => (int) $r['cleared']?'Yes':'No');
		$temp[] = array('v' => (string) $r['cleareddate']);
		$rows[] = array('c' => $temp);
	}
	
	$table['rows'] = $rows;
	
	if (is_array ($rows) && count($rows) == 0) {
		$table = null;
	}

	$jsonTable = json_encode($table);
	echo $jsonTable;
	
	$result->close();
	$conn->close();
?>