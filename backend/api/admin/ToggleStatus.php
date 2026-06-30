<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../../config/database.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Método não permitido."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$adminId = $data["admin_id"] ?? null;
$userId = $data["user_id"] ?? null;

if (!$adminId || !$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Dados inválidos."
    ]);
    exit;
}

$conn->begin_transaction();

try {
    $stmt = $conn->prepare("
        SELECT status
        FROM USERS
        WHERE id = ?
    ");

    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $user = $stmt->get_result()->fetch_assoc();

    if (!$user) {
        throw new Exception("Usuário não encontrado.");
    }

    $newStatus = $user["status"] === "ativo" ? "bloqueado" : "ativo";

    $stmt = $conn->prepare("
        UPDATE USERS
        SET status = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "si",
        $newStatus,
        $userId
    );

    $stmt->execute();
    $action = $newStatus === "ativo" ? "unblock" : "block";

    $stmt = $conn->prepare("
        INSERT INTO ADMINACTIONS
        (
            admin_id,
            target_user_id,
            action
        )
        VALUES (?, ?, ?)
    ");

    $stmt->bind_param(
        "iis",
        $adminId,
        $userId,
        $action
    );

    $stmt->execute();
    $conn->commit();

    echo json_encode([
        "success" => true,
        "status" => $newStatus
    ]);
} catch (Exception $e) {
    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}