<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $setting = Setting::find(1);

        if (!$setting)
            $setting = $this->init();

        return $setting;
    }

    private function init()
    {
        Setting::truncate();

        $setting = new Setting;

        $setting->urls = [];
        $setting->inject_time = 30;
        $setting->protect_time = 20;
        $setting->bot_table_time = 30;
        $setting->push_title = '';
        $setting->push_text = '';

        if ($setting->save())
            return Setting::find(1);
        else
            return null;
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
        $setting = Setting::find(1);

        if (!$setting)
            $setting = $this->init();

        $setting->urls = json_decode($request->urls);
        $setting->inject_time = $request->inject_time;
        $setting->protect_time = $request->protect_time;
        $setting->push_title = $request->push_title ? $request->push_title : "";
        $setting->push_text = $request->push_text ? $request->push_text : "";
        $setting->bot_table_time = $request->bot_table_time;

        return $setting->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
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
