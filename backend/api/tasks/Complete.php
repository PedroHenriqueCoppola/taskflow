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