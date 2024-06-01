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
        Schema::create('matchs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_equipe_1')->constrained('equipes')->onDelete('cascade');
            $table->foreignId('id_equipe_2')->constrained('equipes')->onDelete('cascade');
            $table->integer('score_1')->nullable();
            $table->integer('score_2')->nullable();
            $table->date('dateMa')->nullable();
            $table->time('timeMa')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matchs');
    }
};
