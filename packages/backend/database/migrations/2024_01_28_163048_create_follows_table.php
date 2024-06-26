<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('follows', function (Blueprint $table) {
            $table->id();
            $table->integer('followed_id');
            $table->foreign('followed_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            $table->integer('follower_id');
            $table->foreign('follower_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            $table->unique(['followed_id', 'follower_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
