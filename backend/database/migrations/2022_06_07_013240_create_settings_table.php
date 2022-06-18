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
            $table->string('save_id');
            $table->integer('inject_time');
            $table->integer('protect_time');
            $table->integer('bot_table_time');
            $table->string('push_title');
            $table->string('push_text');
            $table->string('cc_time');
            $table->string('mail_time');
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
