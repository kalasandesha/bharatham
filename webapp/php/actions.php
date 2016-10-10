<?php
header ( 'Content-type: application/json' );

$data1 = [ 
		'a',
		'b',
		'c' 
];
$data2 = [ 
		'name' => 'God',
		'age' => - 1 
];

$option = $_POST ['option'];

if ($option == 'subscribeNewsLetter') {
	echo json_encode ( $data1 );
} elseif($option == 'contactUs') {
	echo json_encode ( $data2 );
}
?>