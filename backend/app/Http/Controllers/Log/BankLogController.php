<?php

namespace App\Http\Controllers\Log;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BankLog;
use Illuminate\Http\Response;

class BankLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($params)
    {
        $botId = $params->botId;
        $injectId = $params->injectId;
        $bFlag = false;
        $model = BankLog::where('id', '>', 0);

        if ($botId != '') {
            $model = $model->where('bot_id', $botId);
            $bFlag = true;
        }

        if ($injectId != '') {
            $model = $model->where('inject_id', $injectId);
            $bFlag = true;
        }

        return $bFlag ? $model->get() : BankLog::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $log = new BankLog;

        $log->inject_id = $request->inject_id;
        $log->application = $request->application;
        $log->logs = $request->logs;
        $log->comment = $request->comment;
        $log->bot_id = $request->bot_id;

        return $log->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return BankLog::find($id);
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
        return BankLog::destory($id);
    }

    public function deleteLog($param)
    {
        if (BankLog::destroy($param->id)) {
            return ['type' => 'success', 'message' => 'A Log is deleted successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }        
    }

    public function deleteAllLog($param)
    {
        if (BankLog::truncate()) {
            return ['type' => 'success', 'message' => 'All Logs are deleted successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }        
    }
}
