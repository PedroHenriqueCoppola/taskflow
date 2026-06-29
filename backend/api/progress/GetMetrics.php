<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../config/database.php";

$userId = $_GET["user_id"] ?? null;

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Usuário inválido."
    ]);
    exit;
}

$sqlTasks = <<<SQL
    SELECT *
    FROM TASKS
    WHERE user_id = ?
        AND is_active = 1
SQL;

$stmt = $conn->prepare($sqlTasks);
$stmt->bind_param("i", $userId);
$stmt->execute();

$tasks = [];

$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

$sqlCompletions = <<<SQL
    SELECT *
    FROM TASKCOMPLETIONS
    WHERE user_id = ?
SQL;

$stmt = $conn->prepare($sqlCompletions);
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();

$completions = [];

while ($row = $result->fetch_assoc()) {
    $completions[] = $row;
}

echo json_encode([
    "success" => true,
    "tasks" => $tasks,
    "completions" => $completions
]);