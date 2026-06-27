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

$taskId = $_POST['task_id'] ?? '';
$userId = $_POST['user_id'] ?? '';

if (!$taskId || !$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Dados inválidos."
    ]);

    exit;
}

$checkSql = <<<SQL
    SELECT id
    FROM TASKCOMPLETIONS
    WHERE
        task_id = ?
        AND user_id = ?
        AND occurrence_date = CURDATE()
SQL;

$checkStmt = $conn->prepare($checkSql);

$checkStmt->bind_param(
    "ii",
    $taskId,
    $userId
);

$checkStmt->execute();

$result = $checkStmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Tarefa já concluída."
    ]);

    exit;
}

$sql = <<<SQL
    INSERT INTO TASKCOMPLETIONS (
        task_id,
        user_id,
        occurrence_date
    )
    VALUES (?, ?, CURDATE())
SQL;

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ii",
    $taskId,
    $userId
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Tarefa concluída."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao concluir tarefa."
    ]);
}