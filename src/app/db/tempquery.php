<?php // content="text/plain; charset=utf-8"
	
	$queryDays=$_GET["q"];
	
	// MySQL database connection info
	$servername = "localhost";
	$username = "webserver";
	$password = "835Eh81Dj5F5";
	
	// Create connection
	//echo "Connect to db<br>";
	$conn = new mysqli($servername, $username, $password);
	
	//if (mysqli_connect_errno()) {
	//	echo "Connect failed\n";
	//	exit();
	//}
	
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	//echo "  Connected<br>";
	//echo "Set SQL Query<br>";

	$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 1 DAY)";
	switch ($queryDays) {
		case 1;
		case "last1Days":
			$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 1 DAY)";
			break;
		case 7;
		case "Last7Days":
			$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 7 DAY)";
			break;
		case 30;
		case "Last30Days":
			$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 30 DAY)";
			break;
		case 365;
		case "Last365Days":
			//$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 365 DAY)";
			//Changed view to use daily averages to reduce data set, no need for the level of detail that was being returned.
			$sql = "SELECT date,temperature,lowtemp from home_heating.vWebAverageTemperatures365Days";
			break;
		default:
			$sql = "SELECT date,temperature,lowtemp from home_heating.vWebTemperature Where DATE(date) >= DATE(NOW() - INTERVAL 1 DAY)";
			break;
	}
	
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
			array('label' => 'Temperature', 'type' => 'number'),
			array('label' => 'LowTemp', 'type' => 'number')
	
	);
	
	$rows = array();
	while($r = $result->fetch_assoc())
	{
		$temp = array();
		// the following line will be used to slice the Pie chart
		$temp[] = array('v' => (string) $r['date']);
	
		// Values of each slice
		$temp[] = array('v' => (int) $r['temperature']);
		if ($r['lowtemp'] != null) {
			// Only include a data point if we have a low temp value from the db.
			$temp[] = array('v' => (int) $r['lowtemp']);
		}
		$rows[] = array('c' => $temp);
	}
	
	$table['rows'] = $rows;
	$jsonTable = json_encode($table);
		
	echo $jsonTable;
	
	$conn->close();
?>