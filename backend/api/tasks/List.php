<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode([
        "success" => false,
        "message" => "Método não permitido."
    ]);

    exit;
}

$userId = $_GET['user_id'] ?? '';

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Usuário não informado."
    ]);

    exit;
}

$sql = "
    SELECT
        id,
        name,
        description,
        frequency,
        time,
        week_days,
        month_day,
        single_date,
        is_active,
        created_at
    FROM TASKS
    WHERE user_id = ?
    AND is_active = 1
    ORDER BY created_at DESC
";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $userId);

$stmt->execute();

$result = $stmt->get_result();

$tasks = [];

while ($task = $result->fetch_assoc()) {
    $tasks[] = $task;
}

echo json_encode([
    "success" => true,
    "tasks" => $tasks
]);