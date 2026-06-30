<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../../config/database.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["user_id"] ?? null;

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Usuário inválido."
    ]);
    exit;
}

$stmt = $conn->prepare("
    DELETE FROM USERS
    WHERE id = ?
");

$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}