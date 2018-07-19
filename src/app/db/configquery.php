<?php // content="text/plain; charset=utf-8"

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

	$sql = "SELECT sysid,name,value,description,updated_on from home_heating.vWebSysConfig";
	
	//echo "SQL Query - $sql<br>";
	
	//Execute the query
	$result = $conn->query($sql);
	
	
	$rows = array();
	//flag is not needed
	$flag = true;
	$table = array();
	
	$rows = array();
	while($r = $result->fetch_assoc())
	{
		$temp = array();
		// the following line will be used to slice the Pie chart
		$temp[] = array('SysId' => (string) $r['sysid']);
	
		// Values of each slice
		$temp[] = array('Name' => (string) $r['name']);
		$temp[] = array('Value' => (int) $r['value']);
		$temp[] = array('Description' => (string) $r['description']);
		$temp[] = array('Updated_On' => (string) $r['updated_on']);

		$rows[] = $temp;
	}
	
	$table['config'] = $rows;
	$jsonTable = json_encode($table);
	
	
	echo $jsonTable;
	
	$conn->close();
?>