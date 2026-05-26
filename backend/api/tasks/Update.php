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

$id = $_POST['id'] ?? '';
$name = trim($_POST['name'] ?? '');
$description = trim($_POST['description'] ?? '');
$frequency = $_POST['frequency'] ?? '';
$time = $_POST['time'] ?: null;
$weekDays = $_POST['week_days'] ?: null;
$monthDay = $_POST['month_day'] ?: null;

if (!$id || !$name || !$frequency) {
    echo json_encode([
        "success" => false,
        "message" => "Campos obrigatórios não preenchidos."
    ]);

    exit;
}

$sql = "
    UPDATE TASKS
    SET
        name = ?,
        description = ?,
        frequency = ?,
        time = ?,
        week_days = ?,
        month_day = ?
    WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssi",
    $name,
    $description,
    $frequency,
    $time,
    $weekDays,
    $monthDay,
    $id
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Tarefa atualizada com sucesso."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao atualizar tarefa."
    ]);
}
