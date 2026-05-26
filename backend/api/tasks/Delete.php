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

if (!$id) {
    echo json_encode([
        "success" => false,
        "message" => "ID da tarefa não informado."
    ]);

    exit;
}

$sql = "DELETE FROM TASKS WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Tarefa excluída com sucesso."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao excluir tarefa."
    ]);
}