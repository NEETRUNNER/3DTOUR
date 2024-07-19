<?php
// Ваш токен бота и chat_id
$bot_token = '7440504983:AAHmGGl-BDF95g9bjAHh9u6wvfoikFueBx8';
$chat_id = '611314398';

// Получение данных из POST запроса
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // Формирование сообщения
    $message = "Новые данные:\n";
    foreach ($data as $key => $value) {
        $message .= ucfirst($key) . ": " . $value . "\n";
    }

    // URL для отправки сообщения в Telegram
    $url = "https://api.telegram.org/bot" . $bot_token . "/sendMessage";

    // Данные для отправки
    $post_data = array(
        'chat_id' => $chat_id,
        'text' => $message
    );

    // Отправка запроса в Telegram
    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type:application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($post_data),
        ),
    );

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Проверка результата
    if ($result === FALSE) {
        echo "Ошибка при отправке сообщения.";
    } else {
        echo "Сообщение успешно отправлено.";
    }
} else {
    echo "Пустые данные.";
}
?>
