<?php // content="text/plain; charset=utf-8"
	
	if($_GET["q"] === "") { $queryDays = 1; } else { $queryDays=$_GET["q"]; }
	
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
	$table = array();
	
	//Add description data
	$row = (object) [
			'columncount' => (int) 2,
			'1'           => (string) 'date',
			'2'           => (string) 'temperature'
	];
	
	$table['config'] = $row;
	
	//Add data rows
	while($r = $result->fetch_assoc())
	{
		$temp;
		if ($r['lowtemp'] != null) {
			// Only include a data point if we have a low temp value from the db.
			$temp = (int) $r['lowtemp'];
		} else {
			$temp = (int) $r['temperature'];
		}
		
		$row = (object) [
			'Date' 		  => (string) $r['date'],
			'Temperature' => (int) $temp
		];

		$rows[] = $row;
	}
	
	$table['data'] = $rows;
	$jsonTable = json_encode($table);
		
	echo $jsonTable;
	
	$conn->close();
?>