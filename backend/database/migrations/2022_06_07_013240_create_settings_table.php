<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->json('urls');
            $table->string('save_id')->default('');
            $table->integer('inject_time')->default(0);
            $table->integer('protect_time')->default(0);
            $table->integer('bot_table_time')->default(0);
            $table->string('push_title')->default('');
            $table->string('push_text')->default('');
            $table->string('cc_time')->default('');
            $table->string('mail_time')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('global_settings');
    }
};
