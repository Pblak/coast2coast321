<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('from_id');
            $table->unsignedBigInteger('to_id');
            $table->longText('content');
            $table->string('type')->default('text');
            // $table->unsignedBigInteger('group_id');
            // $table->foreign('group_id')->references('id')->on('groups');
            $table->foreign('from_id')->references('id')->on('users');
            $table->foreign('to_id')->references('id')->on('users');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
