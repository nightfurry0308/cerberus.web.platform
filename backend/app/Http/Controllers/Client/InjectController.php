<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inject;

use App\Http\Requests\InjectRequest;

class InjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($param)
    {
        $perPage = isset($param->perPage) ? $param->perPage : 10;
        $page = isset($param->page) ? $param->page : 1;

        $count = Inject::whereactive(1)->count();
        $injects = Inject::whereactive(1)->limit($perPage)->offset(($page - 1) * $perPage)->get();

        $rows = [];

        foreach ($injects as $row) {
            $rows[] = [
                'key' => $row->id,
                'id' => $row->id,
                'app' => $row->app,
                'html' => $row->html,
                'png' => $row->png
            ];
        }

        return ['rows' => $rows, 'count' => $count];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($param)
    {
        if (Inject::whereapp($param->app)->count()) {
            return ['type' => "error", 'message' => 'This app already exist.'];
        }

        $inject = new Inject;

        $inject->app = $param->app;
        $inject->html = $param->html;
        $inject->png = $param->png;

        if ($inject->save()) {
            return ['type' => 'success', 'message' => 'An Inject is created successfully'];
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
    public function destroy($param)
    {
        if (Inject::destroy($param->id)) {
            return ['type' => 'success', 'message' => 'An Inject is deleted successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }
    }
}
