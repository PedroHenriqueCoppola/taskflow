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

$sql = <<<SQL
    SELECT 
        TK.*,
        CASE
            WHEN TC.id IS NOT NULL THEN 1
            ELSE 0
        END AS is_completed
    FROM TASKS TK 
    LEFT JOIN 
        TASKCOMPLETIONS TC ON TC.task_id = TK.id AND TC.occurrence_date = CURDATE()
    WHERE 
        TK.user_id = ?
        AND TK.is_active = 1
    ORDER BY 
        TK.created_at DESC
SQL;

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