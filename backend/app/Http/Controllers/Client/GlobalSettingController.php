<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use Illuminate\Http\Request;

class GlobalSettingController extends Controller
{
    public function create($param =  null) {
        GlobalSetting::truncate();

        $row = new GlobalSetting;

        $row->urls = [];
        $row->inject_time = 30;
        $row->protect_time = 20;
        $row->bot_table_time = 30;
        $row->push_title = '';
        $row->push_text = '';

        if ($row->save())
            return GlobalSetting::find(1);
        else
            return null;
    }

    public function show() {
        $row = GlobalSetting::find(1);

        if (!$row)
            $row = $this->create();

        return $row;
    }

    public function update($param) {
        $row = GlobalSetting::find(1);

        if (!$row)
            $row = $this->create();

        $row->urls = $param->urls;
        $row->inject_time = $param->injectTime;
        $row->protect_time = $param->protectTime;
        $row->push_title = $param->pushTitle ? $param->pushTitle : "";
        $row->push_text = $param->pushText ? $param->pushText : "";
        $row->bot_table_time = $param->botTableTime;

        if ($row->save()) {
            return ['type' => 'success', 'message' => 'Global Setting was updated successfully.'];
        } else {
            return ['type' => 'erorr', 'message' => 'Please try again and contact the support team.'];
        }
    }
}
