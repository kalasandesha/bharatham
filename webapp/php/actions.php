<?php
ini_set("include_path", '/home/kprathishtana/php:' . ini_get("include_path") );

require_once ('Mail.php');
require_once ('Mail/mime.php');

try {
	
	header ( 'Content-type: application/json' );
	
	if (! isset ( $_POST ['option'] )) {
		throw new Exception ( "Access to this page without expected option" );
	}
	
	$option = $_POST ['option'];
	
	$servername = "kalasandesha.com";
	$username = "u9043593042";
	$password = "myphonenumber";
	
	$pdo = new PDO ( "mysql:host=$servername;dbname=bharatham-develop", $username, $password );
	$pdo->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	
	if ($option == 'subscribeNewsLetter') {
		$email = $_POST ['email'];
		$stmt = $pdo->prepare ( 'SELECT count(*) as count FROM newspaper_subscription WHERE email = :email' );
		$stmt->execute ( [ 
				'email' => $email 
		] );
		$count = $stmt->fetchColumn ();
		
		if ($count == 0) {
			$pdo->prepare ( "INSERT INTO newspaper_subscription (email) VALUES (?)" )->execute ( [ 
					$email 
			] );
			$result ['success'] = true;
			$result ['message'] = "Email added to subscription list";
		} else {
			$result ['success'] = false;
			$result ['message'] = "Email already in subscription list";
			$result ['error_code'] = 1;
		}
		
		echo json_encode ( $result );
	} elseif ($option == 'contactUs') {
		
		$email = $_POST ['email'];
		$name = $_POST ['name'];
		$message = $_POST ['message'];
		
		$pdo->prepare ( "INSERT INTO queries (name, email, message) VALUES (?, ?, ?)" )->execute ( [
				$name,
				$email,
				$message
		] );
		
		$host = "ssl://sg2plcpnl0218.prod.sin2.secureserver.net";
		$username = "info@kalasandesha.com";
		$password = "information";
		
		// Mail to info inbox
		$crlf = "\n";
		$from = $username;
		$to = $username;
		$subject = "New Enquiry from $name [ $email ]";
		
		$body = $message;
		
		$headers = array (
				'From' => $email,
				'To' => $to,
				'Subject' => $subject 
		);
		
		$smtp = Mail::factory ( 'smtp', array (
				'host' => $host,
				'port' => 465,
				'auth' => true,
				'username' => $username,
				'password' => $password 
		) );
		
		$mime = new Mail_mime($crlf);
				
		$mime->setHTMLBody($body);
				
		$body = $mime->get();
		$headers = $mime->headers($headers);
		
		$mail = $smtp->send ( $to, $headers, $body );
		
		if (PEAR::isError ( $mail )) {
			throw new Exception ( "Error while sending mail to info team" );
		}
		
		// Mail to end user
		$to = $email;
		$subject = "Thanks for your query";
		
		$body = "Hello $name,<br />Thanks for your query.<br /><br />" 
				+ "You have submitted below query to Kala Sandesha Prathishtana<br /> $message<br /><br />" 
				+ "We will get back to you shortly.<br /><br />" 
				+ "Regards,<br />" 
				+ "Team KSP";
		
		$headers = array (
				'From' => $from,
				'To' => $to,
				'Subject' => $subject 
		);
				
		$mime = new Mail_mime($crlf);
				
		$mime->setHTMLBody($body);
				
		$body = $mime->get();
		$headers = $mime->headers($headers);
		
		$smtp = Mail::factory ( 'smtp', array (
				'host' => $host,
				'port' => 465,
				'auth' => true,
				'username' => $username,
				'password' => $password
		) );
		
		$mail = $smtp->send ( $to, $headers, $body );
		
		if (PEAR::isError ( $mail )) {
			throw new Exception ( "Error while sending mail to end user" );
		}
		
		$result ['success'] = true;
		$result ['message'] = "Thanks for message. We will get back to you shortly.";
		echo json_encode ( $result );
		
	} elseif ($option == 'adminSection') {
		
		if (! isset ( $_POST ['key'] )) {
			throw new Exception ( "Unauthorized Access to hidden data" );
		}
		
		$secretKey = $_POST ['key'];
		
		if ($secretKey != 'hardpassword') {
			throw new Exception ( "Password Mismatch. Please try again." );
		}
		
		$result ['mailingList'] = $pdo->query ( 'SELECT email FROM newspaper_subscription' )->fetchAll ( PDO::FETCH_COLUMN );
		
		$result ['queries'] = [ ];
		
		$stmt = $pdo->query ( 'SELECT * FROM queries' );
		
		foreach ( $stmt as $row ) {
			array_push ( $result ['queries'], $row );
		}
		
		$result ['success'] = true;
		$result ['message'] = "Mailing list retrieved ";
		echo json_encode ( $result );
		
	} elseif ($option == 'adminSectionUpdate') {
		
		if (! isset ( $_POST ['key'] )) {
			throw new Exception ( "Unauthorized Access to hidden data" );
		}
		
		$secretKey = $_POST ['key'];
		
		if ($secretKey != 'hardpassword') {
			throw new Exception ( "Password Mismatch. Please try again." );
		}
		
		if (isset ( $_POST ['reviewed'] )) {
			
			$stmt = $pdo->prepare ( 'UPDATE queries SET reviewed = 1, reviewed_date = now() WHERE id = ?' );
			foreach ( $_POST ['reviewed'] as $id ) {
				$stmt->execute ( [ 
						$id 
				] );
			}
		}
		
		if (isset ( $_POST ['unreviewed'] )) {
			
			$stmt = $pdo->prepare ( 'UPDATE queries SET reviewed = 0, reviewed_date = null WHERE id = ?' );
			foreach ( $_POST ['unreviewed'] as $id ) {
				$stmt->execute ( [ 
						$id 
				] );
			}
		}
		
		$result ['success'] = true;
		$result ['message'] = "Reviewed queries updated";
		echo json_encode ( $result );
	}
	
} catch ( Exception $e ) {
	
	$error ['success'] = false;
	$error ['message'] = $e->getMessage ();
	$result ['error_code'] = -1;
	echo json_encode ( $error );
}
?>