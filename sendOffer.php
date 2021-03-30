<?php 
    // какая-то инициализация
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    // подключение файлов phpmailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    // создаем экземпляр объекта PHPMailer
    $mail = new PHPMailer(true);
    // Кодировка UTF-8 что бы не получать абра-кадабру
    $mail->CharSet = 'UTF-8';
    // подключаем языки (не обязательное поле)
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
    // от кого письмо
    $mail->setFrom('hartiya2021@gmail.com', 'Максим');
    // кому отправлять
    $mail->addAddress('charta_msk@bk.ru');
    // тема письма
    $mail->Subject = 'Хартия (Жалобы и предложения)';
   
    //Тело письма
    $body = '<h1>Письмо из раздела "Жалобы и предложения"</h1>';
    // если поле есть то формируем разметку html 
    // c данныи и все это пушим в тело ответа
    if (trim(!empty($_POST['name']))){
        $body.='<p><strong>От кого (ФИО):</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['organization']))){
        $body.='<p><strong>Организация:</strong> '.$_POST['organization'].'</p>';
    }
    if (trim(!empty($_POST['region']))){
        $body.='<p><strong>Регион:</strong> '.$_POST['region'].'</p>';
    }

    if (trim(!empty($_POST['inn']))){
        $body.='<p><strong>ИНН:</strong> '.$_POST['inn'].'</p>';
    }

    if (trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }
    if (trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }



    if (trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }
      
    
    $mail->Body = $body;
    // отправляем
    if (!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }
    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
