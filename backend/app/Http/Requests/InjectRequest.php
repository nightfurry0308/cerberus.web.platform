<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InjectRequest extends FormRequest
{
    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'app' => 'required',
            'html' => 'required',
            'icon' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'app.required' => 'App name is required',
            'html.required' => 'HTML content is required',
            'icon.required' => 'ICON content is required'
        ];
    }
}
