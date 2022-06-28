<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inject;

use App\Http\Requests\InjectRequest;
use Image;
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
                'html' => $row->html ? 1 : 0,
                'png' => $row->png ? 1: 0
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

        // $path = 'images/temp/' . $param->app . '.png';
        // Image::make($param->png)->resize(16, 16)->encode('png')->save($path);

        // $inject->png = base64_encode(file_get_contents($path));
        $inject->png = $param->png;

        if ($inject->save()) {
            return ['type' => 'success', 'message' => 'An Inject is created successfully'];
        } else {
            return ['type' => 'error', 'message' => 'Error is occuried. Please try again and contact the support team'];
        }
    }

    public function show($param) {
        return Inject::find($param->id);
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
