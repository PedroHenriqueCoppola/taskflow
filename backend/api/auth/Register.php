<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Método não permitido."
    ]);

    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$name || !$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Preencha todos os campos."
    ]);
    exit;
}

$checkEmailSql = <<<SQL
    SELECT id FROM USERS WHERE email = ?
SQL;

$checkStmt = $conn->prepare($checkEmailSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();

$emailResult = $checkStmt->get_result();

if ($emailResult->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Este email já está cadastrado."
    ]);

    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO USERS (name, email, password)
        VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param("sss", $name, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Usuário criado com sucesso."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao criar usuário."
    ]);
}