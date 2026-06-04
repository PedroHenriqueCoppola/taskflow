<?php

header("Access-Control-Allow-Origin: *");

require_once '../../config/database.php';

header('Content-Type: application/json');

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Usuário inválido."
    ]);

    exit;
}

$sql = <<<SQL
    SELECT * FROM TASKCOMPLETIONS WHERE user_id = ?
SQL;

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();

$completions = [];

while ($row = $result->fetch_assoc()) {
    $completions[] = $row;
}

echo json_encode([
    "success" => true,
    "completions" => $completions
]);