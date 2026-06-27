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

$userId = $_POST['user_id'] ?? '';
$name = $_POST['name'] ?? '';
$description = $_POST['description'] ?? '';
$frequency = $_POST['frequency'] ?? '';
$time = $_POST['time'] ?? null;
$weekDays = $_POST['week_days'] ?? null;
$monthDay = $_POST['month_day'] ?? null;
$singleDate = $_POST['single_date'] ?? null;

if (!$userId || !$name || !$frequency) {
    echo json_encode([
        "success" => false,
        "message" => "Campos obrigatórios não preenchidos."
    ]);

    exit;
}

$sql = "
    INSERT INTO TASKS (
        user_id,
        name,
        description,
        frequency,
        time,
        week_days,
        month_day,
        single_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isssssis",
    $userId,
    $name,
    $description,
    $frequency,
    $time,
    $weekDays,
    $monthDay,
    $singleDate
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Tarefa criada com sucesso."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao criar tarefa."
    ]);
}