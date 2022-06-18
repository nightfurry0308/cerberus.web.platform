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
        Schema::create('bots', function (Blueprint $table) {
            $table->id();
            $table->string('bot_id');
            $table->string('ip');
            $table->string('operator');
            $table->string('phone_number');
            $table->string('model');
            $table->string('android');
            $table->string('tag');
            $table->string('country');
            $table->string('last_connect');
            $table->string('date_infection');
            $table->string('commands');
            $table->string('banks');
            $table->string('comment');
            $table->string('stat_protect');
            $table->string('stat_screen');
            $table->string('stat_accessibility');
            $table->string('stat_sms');
            $table->string('stat_cards');
            $table->string('stat_banks');
            $table->string('stat_mails');
            $table->string('active_device');
            $table->string('time_working');
            $table->string('stat_download_module');
            $table->string('stat_admin');
            $table->string('update_settings');
            $table->string('locale');
            $table->string('battery_level');
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
        Schema::dropIfExists('bots');
    }
};
