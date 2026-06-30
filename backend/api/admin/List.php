<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../../config/database.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Método não permitido."
    ]);
    exit;
}

$sql = <<<SQL
    SELECT
        U.id,
        U.name,
        U.email,
        U.status,
        (
            SELECT COUNT(*)
            FROM TASKS T
            WHERE T.user_id = U.id
        ) AS tasks
    FROM USERS U
    WHERE U.role = 'user'
    ORDER BY U.created_at DESC
SQL;

$result = $conn->query($sql);

$users = [];

while ($user = $result->fetch_assoc()) {
    $users[] = $user;
}

echo json_encode([
    "success" => true,
    "users" => $users
]);