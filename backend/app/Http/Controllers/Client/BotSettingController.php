<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BotSetting;

class BotSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store($bot_id)
    {
        $setting = new BotSetting;

        $setting->bot_id = $bot_id;
        $setting->hide_sms = '0';
        $setting->lock_device = '0';
        $setting->off_sound = '0';
        $setting->key_logger = '0';
        $setting->active_injection = '';

        $setting->save();

        return BotSetting::where('bot_id', $bot_id)->first();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        $bot_id = $param->botId;
        $setting = BotSetting::where('bot_id', $bot_id)->first();

        if (!$setting) {
            $setting = $this->store($bot_id);
        }

        return $setting;
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
    public function update($params)
    {
        $bot_setting = BotSetting::where('bot_id', $params->botId)->first();

        if (!$bot_setting)
            $bot_setting = $this->store($params->botId);
        
        $bot_setting->hide_sms = $params->hideSms;
        $bot_setting->lock_device = $params->lockDevice;
        $bot_setting->off_sound = $params->offSound;
        $bot_setting->key_logger = $params->keyLogger;

        if ($bot_setting->save()) {
            return ['type' => 'success', 'message' => 'Bot setting is updated successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }
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
}
